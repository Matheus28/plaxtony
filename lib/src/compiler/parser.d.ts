import * as Types from './types';
export declare class Parser {
    private scanner;
    private currentToken;
    private parsingContext;
    private sourceFile;
    private syntaxTokens;
    private token();
    private nextToken();
    private parseErrorAtCurrentToken(message, arg0?);
    private parseErrorAtPosition(start, length, message, arg0?);
    private speculationHelper<T>(callback, isLookAhead);
    private lookAhead<T>(callback);
    private parseExpected(kind, diagnosticMessage?, shouldAdvance?);
    private parseOptional(t);
    private parseTokenNode<T>();
    private createNode(kind, pos?, assignSyntaxTokens?);
    private createNodeArray<T>(elements?, pos?);
    private createMissingNode<T>(kind);
    private createMissingList<T>();
    private finishNode<T>(node, end?, assignSyntaxTokens?);
    private isListTerminator(kind);
    private parsingContextErrors(context);
    private isListElement(parsingContext, inErrorRecovery);
    private parseList<T>(kind, parseElement);
    private parseBracketedList<T>(kind, parseElement, open, close);
    private parseDelimitedList<T>(kind, parseElement);
    private isVariableDeclaration();
    private isFunctionDeclaration();
    private isParameter();
    private isStartOfExpression();
    private isStartOfStatement();
    private isStartOfVariableDeclaration();
    private isStartOfFunctionDeclaration();
    private isStartOfRootStatement();
    private isStartOfTypeDefinition();
    private isStartOfParameter();
    private parseLiteral(kind?);
    private parseInclude();
    private parseIdentifier(alwaysAdvance?);
    private parseExpectedIdentifier();
    private parseTypeDefinition();
    private parseParameter();
    private parsePropertyDeclaration();
    private parseStructDeclaration();
    private parseModifiers();
    private parseFunctionDeclaration();
    private parseVariableDeclaration();
    private parseBlock(allowVarDeclarations?);
    private isUpdateExpression();
    private isStartOfLeftHandSideExpression();
    private makeBinaryExpression(left, operatorToken, right);
    private isBinaryOperator();
    private getBinaryOperatorPrecedence();
    private parsePrimaryExpression();
    private parseParenthesizedExpression();
    private parseMemberExpressionOrHigher();
    private parseMemberExpressionRest(expression);
    private parseCallExpressionRest(expression);
    private parseLeftHandSideExpressionOrHigher();
    private parseUpdateExpression();
    private parsePrefixUnaryExpression();
    private parseSimpleUnaryExpression();
    private parseUnaryExpressionOrHigher();
    private parseBinaryExpressionOrHigher(precedence);
    private parseBinaryExpressionRest(precedence, leftOperand);
    private parseAssignmentExpressionOrHigher();
    private parseExpression(allowAssignment?);
    private parseExpectedExpression(allowAssignment?);
    private parseTypedefDeclaration();
    private parseReturnStatement();
    private parseBreakOrContinueStatement(kind);
    private parseBreakpointStatement();
    private parseExpressionStatement();
    private parseEmptyStatement();
    private parseIfStatement();
    private parseDoStatement();
    private parseWhileStatement();
    private parseForStatement();
    private parseStatement();
    constructor();
    setText(text: string): void;
    parseFile(fileName: string, text: string): Types.SourceFile;
}
