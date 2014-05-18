
function Session(scrumMasterName) {
    this.scrumMasterName = scrumMasterName;
};

function RootController() {
}

RootController.prototype.createSession = function(scrumMasterName) {
        if (scrumMasterName == "")
            throw new Error("not implemented!");

        return new Session(scrumMasterName);
};

exports.RootController = RootController;