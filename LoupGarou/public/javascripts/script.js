if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

function Card(name,imgpath)
{
    this.name = name;
    this.img = imgpath;

}

GameUIStates = {
    DistributeCards:1
    ,PlayGame:2
}

GameStates = {
    Init:1
    ,FirstNight:2
};

function Game()
{
    this.mState = GameStates.Init;
    this.mUIState = GameUIStates.DistributeCards;



}