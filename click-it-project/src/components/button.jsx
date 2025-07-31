'use client'
import React from 'react'
import { LuCirclePlus } from "react-icons/lu";
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import {clsx} from 'clsx';
import { useToast } from '@/hooks/use-toast';
import {toast} from 'sonner';
import {Task} from '@prisma/client';
import { deleteNote } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { MdModeEditOutline,MdOutlineDelete  } from "react-icons/md";
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';
import { set } from 'zod';

export const SaveButton = ({ label }) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "bg-indigo-500 hover:bg-indigo-700 duration-300 w-fit py-1 px-4 rounded-md text-lg text-white",
    { "opacity-50 cursor-progress": pending }
  );

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={() => {
        if (!pending) {
          toast.success(label === "save" ? "Note Berhasil Dibuat" : "Note Berhasil Diperbarui");
        }
      }}
    >
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save Note"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
/**
 *@param {Object} props
 *@param {string} props.id
**/

export const EditButton = ({id}) => {
  return (
    <Link href={`/edit/${id}`} className='bg-blue-200 flex items-center justify-center shadow-inner hover:bg-indigo-400 duration-300 w-fit p-2 rounded-lg text-sm'>
      <MdModeEditOutline className='text-lg'/>
    </Link>
  )
}

/**
 *@param {Object} props
 *@param {string} props.id
**/
export const DeleteButton = ({id, onDeleteSuccess}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteNote = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteNote(id);
      if(res?.success) {
        toast.success("Note berhasil dihapus");
        onDeleteSuccess(); // Panggil callback setelah berhasil
      } else {
        toast.error(res?.Error?.general || "Gagal menghapus note");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus note");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-400 rounded-lg p-2 w-fit text-sm hover:bg-red-600 shadow-md">
          <MdOutlineDelete className="text-lg" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin Ingin Menghapus Notes?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteNote}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const DetailNotes = ({id}) =>{
  
}
