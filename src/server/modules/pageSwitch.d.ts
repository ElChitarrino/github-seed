interface IPageSwitch {
    get(req: any, res: any, next: any, authenticatedFile: string, unauthenticatedFile: string);
}
