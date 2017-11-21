import * as gt from '../compiler/types';
import { getSourceFileOfNode } from '../compiler/utils';
import { Store } from './store';
import * as trig from '../sc2mod/trigger';
import { SC2Workspace } from '../sc2mod/archive';
import * as lsp from 'vscode-languageserver';

const elementNotValidCharsRE = /[^a-zA-Z0-9_]+/g;
const elementValidCharsRE = /[a-zA-Z]+/g;
const quationMarkRE = /"/g;

export class S2WorkspaceMetadata {
    protected workspace: SC2Workspace;
    protected symbolMap: Map<string, trig.Element> = new Map();
    protected presetValueParentMap: Map<string, trig.Preset> = new Map();

    private getElementSymbolName(el: trig.Element) {
        let parts: string[] = [];
        let elemName: string;

        if (el.name) {
            elemName = el.name;
        }
        else {
            elemName = this.workspace.locComponent.triggers.text('Name', el).replace(elementNotValidCharsRE, '');
        }

        if (
            (el instanceof trig.FunctionDef && el.flags & trig.ElementFlag.Native) ||
            (<trig.PresetValue>el).value
        ) {
            parts.push(elemName);
        }
        else {
            if (el.libId) {
                parts.push('lib' + el.libId);
            }

            if (el instanceof trig.FunctionDef) {
                parts.push('gf');
            }
            else if (el instanceof trig.Preset) {
                parts.push('ge');
            }

            if (parts.length) {
                parts.push(elemName);
            }
            else {
                parts.push(elemName.charAt(0).toLowerCase() + elemName.substr(1));
            }
        }

        return parts.join('_');
    }

    private mapContainer(container: trig.ElementContainer) {
        for (const el of container.getElements().values()) {
            if (el instanceof trig.FunctionDef) {
                if (el.flags & trig.ElementFlag.Template) continue;

                this.symbolMap.set(this.getElementSymbolName(el), el);
            }
            else if (el instanceof trig.Preset) {
                if (!(el.flags & trig.ElementFlag.PresetGenConstVar)) continue;
                if ((<trig.Preset>el).baseType === 'bool') continue;

                for (const presetRef of (<trig.Preset>el).values) {
                    const presetValue = presetRef.resolve();
                    this.presetValueParentMap.set(presetValue.link(), el);

                    if (el.flags & trig.ElementFlag.PresetCustom) {
                        if (presetValue.value.match(elementValidCharsRE)) {
                            this.symbolMap.set(presetValue.value, presetValue);
                        }
                    }
                    else {
                        const pname = this.getElementSymbolName(el) + '_' + presetValue.name;
                        this.symbolMap.set(pname, presetValue);
                    }
                }
            }
        }
    }

    public async build() {
        await this.workspace.trigComponent.sync();
        await this.workspace.locComponent.sync();

        for (const lib of this.workspace.trigComponent.getStore().getLibraries().values()) {
            this.mapContainer(lib);
        }
        this.mapContainer(this.workspace.trigComponent.getStore());
    }

    constructor(workspace: SC2Workspace) {
        this.workspace = workspace;
    }

    public findElementByName(name: string) {
        return this.symbolMap.get(name);
    }

    public findPresetDef(presetValue: trig.PresetValue) {
        return this.presetValueParentMap.get(presetValue.link());
    }

    public getElementDoc(el: trig.Element) {
        const name = '**' + this.workspace.locComponent.triggers.text('Name', el) + '**';

        if (el instanceof trig.FunctionDef) {
            const hint = this.workspace.locComponent.triggers.text('Hint', el);
            return name + (hint ? '\n\n' + hint.replace(quationMarkRE, '*') : '');
        }
        else if (el instanceof trig.PresetValue) {
            const presetName = this.workspace.locComponent.triggers.text('Name', this.findPresetDef(el));
            return name + (presetName ? ' - ' + presetName : '');
        }
        else if (el instanceof trig.ParamDef) {
            let type: string;
            if ((<trig.ParamDef>el).type.type === 'gamelink') {
                type = '`gamelink<' + (<trig.ParamDef>el).type.gameType + '>`';
            }
            else if ((<trig.ParamDef>el).type.type === 'preset') {
                type = '' + this.workspace.locComponent.triggers.text('Name', (<trig.ParamDef>el).type.typeElement.resolve()) + '';
            }
            else {
                type = '`' + (<trig.ParamDef>el).type.type + '`';
            }
            return name + ' - ' + type + '';
        }
        else {
            return name;
        }
    }

    public getSymbolDoc(symbolName: string) {
        const el = this.findElementByName(symbolName);
        if (!el) return null;
        return this.getElementDoc(el);
    }

    public getFunctionArgumentsDoc(symbolName: string) {
        const el = <trig.FunctionDef>this.findElementByName(symbolName);

        if (!el) return null;

        const docs: string[] = [];

        if (el.flags & trig.ElementFlag.Event) {
            docs.push('**Trigger**');
        }

        for (const param of el.getParameters()) {
            docs.push(this.getElementDoc(param));
        }

        return docs;
    }
}

export function getDocumentationOfSymbol(store: Store, symbol: gt.Symbol) {
    if (!store.s2metadata) return null;
    return store.s2metadata.getSymbolDoc(symbol.escapedName);
}
