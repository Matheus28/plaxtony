import * as lsp from 'vscode-languageserver';
export declare class Server {
    private connection;
    private store;
    private diagnosticsProvider;
    private navigationProvider;
    private completionsProvider;
    private signaturesProvider;
    private definitionsProvider;
    private documents;
    private workspaces;
    private createProvider<T>(cls);
    createConnection(connection?: lsp.IConnection): lsp.IConnection;
    log(msg: string): void;
    private onInitialize(params);
    private onDidChangeConfiguration(ev);
    private onDidChangeContent(ev);
    private onProvideDiagnostics();
    private onDidOpen(ev);
    private onDidClose(ev);
    private onDidFindInWorkspace(ev);
    private onCompletion(params);
    private onCompletionResolve(params);
    private onDocumentSymbol(params);
    private onWorkspaceSymbol(params);
    private onSignatureHelp(params);
    private onDefinition(params);
}
export declare function createServer(): lsp.IConnection;
