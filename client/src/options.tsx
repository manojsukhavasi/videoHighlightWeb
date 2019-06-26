
export interface TYPE_KEY_OBJECT {
    title: string;
    required: boolean;
    options: OPTION_OBJ[];
}

export interface OPTION_OBJ {
    title: string;
    value: string;
}

export interface FORM_OPTION_OBJ {
    [typeKey: string]: TYPE_KEY_OBJECT;
}

export const HIGHLIGHT_TYPES: FORM_OPTION_OBJ = {
    "batsman": {
        title: "Batsman",
        required: true,
        options: [{
            title: "Virat Kohli",
            value: "Kohli",
        }, {
            title: "MS Dhoni",
            value: "Dhoni",
        }, {
            title: "David Warner",
            value: "Warner"
        }]
    },
    "bowler": {
        title: "Bowler",
        required: true,
        options: [{
            title: "Jaspreet Bumrah",
            value: "Bumrah",
        }, {
            title: "Yuzvendra Chahal",
            value: "Chahal",
        },{
           title: "Lasith Malinga",
           value: "Malinga",
        }]
    },
    "shot": {
        title: "Shots",
        required: true,
        options: [{
            title: "Pull",
            value: "pull",
        }, {
            title: "Sweep",
            value: "sweep",
        }]
    },
    "ball_type": {
        title: "Ball Types",
        required: true,
        options: [{
            title: "Yorker",
            value: "yorker",
        }, {
            title: "Googly",
            value: "googly",
        }]
    },
    "runs": {
        title: "Runs",
        required: true,
        options: [{
            title: "1",
            value: "1",
        }, {
            title: "2",
            value: "2",
        }, {
            title: "3",
            value: "3",
        }, {
            title: "Four",
            value: "4",
        }, {
            title: "5",
            value: "5",
        }, {
            title: "Six",
            value: "6",
        }]
    },
    "wicket": {
        title: "Wickets",
        required: false,
        options: [{
            title: "No Choice",
            value: "undefined",
        }, {
            title: "Wicket",
            value: "true",
        }, {
            title: "No Wicket",
            value: "false",
        }]
    },
}
