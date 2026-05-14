type User = {
    id: string;
    name: string;
};

type Schedule = {
    start: Date;
    end: Date;
    assigner: User.name;
};
