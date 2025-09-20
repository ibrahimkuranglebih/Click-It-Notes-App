'use server';

import { z } from 'zod';
import prisma from './prisma';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Status, Type } from '@prisma/client';

// **Schema Validasi Note**
const NoteSchema = z.object({
    userId : z.string().min(10),
    title: z.string().min(1, "Title Must Have 1 Character"),
    deskripsi: z.string().min(3, "Descriptions Must Have 3 Character"),
    taskType: z.enum(["work", "study", "event", "task", "others"]).default("others"),
    taskStatus: z.enum(["unfinished", "finished"]).default("unfinished"),
});

export const SaveNote = async (prevState: any, formData: FormData) => {
    const formDataObj: { [key: string]: FormDataEntryValue } = {};
    for (const [key, value] of (formData as any)) {
        formDataObj[key] = value;
    }
    console.log("Received formData:", formDataObj); // Debugging
    
    const validateNotes = NoteSchema.safeParse({
        userId: formData.get("userId"),
        title: formData.get("title"),
        deskripsi: formData.get("deskripsi"),
        taskType: (formData.get("taskType") || "others").toString().toLowerCase(),
        taskStatus: (formData.get("taskStatus") || "unfinished").toString().toLowerCase(),
    });

    console.log("Validation Result:", validateNotes); // Debugging

    if (!validateNotes.success) {
        console.error("Validation Error:", validateNotes.error.flatten().fieldErrors);
        return { Error: validateNotes.error.flatten().fieldErrors };
    }

    // Pastikan userId valid di database
    console.log("Saving note with data:", {
        userId: validateNotes.data.userId,
        title: validateNotes.data.title,
        deskripsi: validateNotes.data.deskripsi,
        taskType: validateNotes.data.taskType,
        taskStatus: validateNotes.data.taskStatus,
    });

    const taskType = validateNotes.data.taskType as Type;
    const taskStatus = validateNotes.data.taskStatus as Status;

    console.log("Final taskType:", taskType);
    console.log("Final taskStatus:", taskStatus);
    try {
        const newNote = await prisma.note.create({
            data: {
                userId: validateNotes.data.userId,
                title: validateNotes.data.title,
                deskripsi: validateNotes.data.deskripsi,
                taskType, 
                taskStatus, 
            },
        });

        console.log("Note created successfully:", newNote);
        revalidatePath("/notes");
        return { success: true, shouldRedirect: true }; // Tambahkan flag untuk redirect
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan note:", error);
        return { Error: { general: "Failed to Save Note. Try Again Later." } };
    }
};


export const updateNote = async (id: string, prevState: any, formData: FormData) => {
    try {
        const validateNotes = NoteSchema.safeParse({
            userId: formData.get("userId"),
            title: formData.get("title"),
            deskripsi: formData.get("deskripsi"),
            taskType: formData.get("taskType"),
            taskStatus: formData.get("taskStatus")
        });

        if (!validateNotes.success) {
            console.error("Validation error:", validateNotes.error.flatten());
            return { Error: validateNotes.error.flatten().fieldErrors };
        }

        console.log("Validated data:", validateNotes.data);

        const updatedNote = await prisma.note.update({
            where: { 
                id,
                userId: validateNotes.data.userId 
            },
            data: {
                title: validateNotes.data.title,
                deskripsi: validateNotes.data.deskripsi,
                taskType: validateNotes.data.taskType,
                taskStatus: validateNotes.data.taskStatus,
                tanggalDiubah: new Date() 
            }
        });

        console.log("Successfully updated note:", updatedNote);
        
        revalidatePath("/notes");
        return { success: true, data: updatedNote };
    } catch (error) {
        console.error("Full error during update:", error);
        return { Error: { general: "Gagal mengupdate catatan. Coba lagi nanti." } };
    }
};

export const deleteNote = async (id: string) => {
  try {
    await prisma.note.delete({
      where: {id}
    });
    revalidatePath('/notes');
    return { success: true, message: "Note Was Deleted" };
  } catch (error) {
    return { Error: { general: "Gagal menghapus catatan. Coba lagi nanti." } };
  }
};