'use client'
import { updateNote } from '@/lib/actions'
import React from 'react'
import { SaveButton } from './button';
import { useActionState } from 'react';

const EditFormComponent = ({ note, onSuccess }) => {
    const updateNoteWithId = updateNote.bind(null, note.id);
    const [state, formAction] = useActionState(updateNoteWithId, null);
    
    React.useEffect(() => {
        console.log("Current form state:", state);
        if (state?.success) {
            console.log("Update successful, triggering onSuccess");
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <div>
            <form action={formAction} className=''>
                <div className='font-bold text-3xl mb-2'>
                    Update Notes
                </div>
                <div className='mb-2 flex flex-col'>
                    <label htmlFor="title" className='text-[20px]'>Judul Tugas</label>
                    <input 
                        type="text" 
                        name='title' 
                        id='title' 
                        className='border-2 p-1 rounded-md hover:bg-gray-100 duration-300' 
                        placeholder='Judul Tugas ...' 
                        defaultValue={note.title}
                        required
                    />
                    <div id="title-error" aria-live='polite' aria-atomic="true">
                        <p className='mt-2 text-sm text-red-500'>{state?.Error?.title}</p>
                    </div>
                </div>
                <div className='mb-2 flex flex-col'>
                    <label htmlFor="deskripsi" className='text-[20px]'>Deskripsi Tugas</label>
                    <textarea 
                        name='deskripsi' 
                        id='deskripsi' 
                        className='border-2 p-1 rounded-md hover:bg-gray-100 duration-300' 
                        placeholder='Deskripsi Tugas ...' 
                        defaultValue={note.deskripsi}
                        required
                        minLength={3}
                    />
                    <div id="deskripsi-error" aria-live='polite' aria-atomic="true">
                        <p className='mt-2 text-sm text-red-500'>{state?.Error?.deskripsi}</p>
                    </div>
                </div>
                <input type="hidden" name="taskType" value={note.taskType} />
                <input type="hidden" name="taskStatus" value={note.taskStatus} />
                <input type="hidden" name="userId" value={note.userId} />
                <SaveButton label='update'/>
            </form>
            {state?.Error?.general && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    {state.Error.general}
                </div>
            )}
        </div>
    )
}

export default EditFormComponent