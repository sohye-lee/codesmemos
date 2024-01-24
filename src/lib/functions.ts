import { ExtendedComment } from "./types";

export const dateFormat = (datetime:Date) => {
    return new Date(datetime).toLocaleDateString();
} 
interface SortedComment {
    layer: number;
    index: number;
    comment: ExtendedComment;

}
interface SortedComments {
    
    [key: string] : SortedComment;
}

export function sortReplies (comments:ExtendedComment[]) {
    let sortedComments:SortedComments = { };
    let resultComments = [];

    const getIndex = (layer:number) => {
        layer * 10^6 
    }
   
    let index = 0;
    let layer = 1;
  
        
    comments.filter((c) => !c.parentId).map((c) => {
        sortedComments[c.id] = {
            layer,
            index: 10**8*index ,
            comment: c,
        
        }
        index += 1
    })
 
    // to revise
    comments.filter((c) => c.parentId).map((c) => {
        const parent = sortedComments[c.parent.id];
        sortedComments[c.id] = {
            layer: parent.layer + 1,
            index: 10**8*(parent.layer) + index, 
            comment: c
        }
        index += 1
    })

    return sortedComments;
    return Object.keys(sortedComments).sort((a,b) => {
        return sortedComments[a].index - sortedComments[b].index
    })

}