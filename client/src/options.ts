
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

export const PAGE_TYPES = ["Cricket", "Badminton", "Tennis"];


export const CRICKET_HIGHLIGHT_TYPES: FORM_OPTION_OBJ = {
    "batsman": {
        title: "Batsman",
        required: true,
        options: [{
            title: "Virat Kohli",
            value: "kohli",
        }, {
            title: "MS Dhoni",
            value: "dhoni",
        }]
    },
    "bowler": {
        title: "Bowler",
        required: true,
        options: [{
            title: "Jaspreet Bumrah",
            value: "bumrah",
        }, {
            title: "Rashid Khan",
            value: "rashid",
        }]
    },
    "shot": {
        title: "Shots",
        required: true,
        options: [{
            title: "Cover Drive",
            value: "cover-drive",
        }, {
            title: "Pull",
            value: "pull",
        }, {
            title: "Sweep",
            value: "sweep",
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
            title: "4",
            value: "4",
        }, {
            title: "5",
            value: "5",
        }, {
            title: "6",
            value: "6",
        }]
    },
    "ball_type": {
        title: "Ball Types",
        required: true,
        options: [{
            title: "Yorker",
            value: "yorker",
        }, {
            title: "Short Ball",
            value: "short-ball",
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