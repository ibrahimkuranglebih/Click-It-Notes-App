import prisma from "./prisma";

export const getNotes = async (token: string): Promise<any[]> => {
    try {
        const res = await fetch("http://localhost:5000/api/notes", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        return data.notes || [];
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        return [];
    }
};

export const getUser = async (query : string, currentPage : number) =>{
    try{
        const response = await fetch('http://localhost:5000/api/notes');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch(error){
        console.log("failed to fetch note data");
        return [];
    }
}

export const getNotesByID = async (id : string) => {
    try{
        const notes = await prisma.note.findUnique({where : {id}});
        return notes;
    } catch(error){
        throw new Error("failed to fetch note data");
    }
}