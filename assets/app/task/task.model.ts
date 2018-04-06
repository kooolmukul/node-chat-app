export class Task {
    constructor(private taskName:string,
                private description:string, 
                private startTime:string,
                private endTime :string, 
                private  assigedTo? : string[]
            ){};
}