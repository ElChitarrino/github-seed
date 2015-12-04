class PageSwitch implements IPageSwitch {
    public get(req, res, unauthenticatedFile, authenticatedFile) {
        let file = req.user ? authenticatedFile : unauthenticatedFile;
        res.status(200).sendFile(file);
    }
}

export = new PageSwitch;
