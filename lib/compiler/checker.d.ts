import * as gt from './types';
import { Store } from '../service/store';
export declare function getNodeId(node: gt.Node): number;
export declare function getSymbolId(symbol: gt.Symbol): number;
export declare class TypeChecker {
    private store;
    private nodeLinks;
    private diagnostics;
    constructor(store: Store);
    private report(location, msg, category?);
    private getNodeLinks(node);
    private getTypeFromArrayTypeNode(node);
    private getPropertyOfType(type, name);
    private getDeclaredTypeOfStruct(symbol);
    private getDeclaredTypeOfSymbol(symbol);
    private getTypeFromTypeNode(node);
    private getTypeOfSymbol(symbol);
    private getTypeOfVariableOrParameterOrProperty(symbol);
    private getTypeOfFunction(symbol);
    getTypeOfNode(node: gt.Node): gt.Type;
    private getRegularTypeOfExpression(expr);
    private getTypeOfExpression(node, cache?);
    checkSourceFile(sourceFile: gt.SourceFile): gt.Diagnostic[];
    private checkSourceElement(node);
    private checkFunction(node);
    private checkVariableDeclaration(node);
    private checkStructDeclaration(node);
    private checkIfStatement(node);
    private checkForStatement(node);
    private checkWhileStatement(node);
    private checkBreakOrContinueStatement(node);
    private checkReturnStatement(node);
    private checkArrayType(node);
    private checkMappedType(node);
    private checkBlock(node);
    private checkExpressionStatement(node);
    private checkExpression(node, checkMode?);
    private checkExpressionWorker(node, checkMode);
    private checkBinaryExpression(node, checkMode?);
    private checkParenthesizedExpression(node, checkMode?);
    private checkPrefixUnaryExpression(node, checkMode?);
    private checkPostfixUnaryExpression(node, checkMode?);
    private checkIdentifier(node);
    private checkCallExpression(node);
    private checkNonNullExpression(node);
    private checkNonNullType(type, errorNode);
    private checkIndexedAccess(node);
    private checkPropertyAccessExpression(node);
    private resolveName(location, name, nameNotFoundMessage);
    private resolveEntityName(entityName, meaning, ignoreErrors?, location?);
    private getSymbolOfEntityNameOrPropertyAccessExpression(entityName);
    getSymbolAtLocation(node: gt.Node): gt.Symbol | undefined;
}
