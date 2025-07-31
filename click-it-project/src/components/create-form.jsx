'use client'
import React, { useActionState } from 'react'
import { SaveNote } from '@/lib/actions'
import { SaveButton } from './button'
import { useEffect } from 'react'
import { useState } from 'react'

const CreateNoteComponents = ({onSuccess}) => {
    const [formSave, formAction] = useActionState(SaveNote, null);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formKey, setFormKey] = useState(0); // Tambahkan key untuk form

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser?.id) {
                setUserId(parsedUser.id);
            }
        }
        setIsLoading(false); 
    }, []);

    
  useEffect(() => {
    if (formSave?.success) {
        onSuccess(); 
        setFormKey(prev => prev + 1); // Force form reset
    }
  }, [formSave, onSuccess]);

    const user = localStorage.getItem("user");
    const newUser = JSON.parse(user);
    const userID = newUser.id

    return (
        <div>
            <form key={formKey} action={formAction} className=''onSubmit={(e) => {
                if (!userId) {
                    e.preventDefault(); // Cegah submit jika userId belum siap
                    alert("User ID belum tersedia. Coba lagi.");
                }
            }}>
                <input type="hidden" name="userId" value={userID} />
                <input type="hidden" name="taskStatus" value="unfinished" />

                <div className='font-bold text-3xl mb-2'>Tambah Notes</div>

                <div className='mb-2 flex flex-col'>
                    <label htmlFor="title" className='text-[20px]'>Judul Tugas</label>
                    <input type="text" name='title' id='title' className='border-2 p-1 rounded-md hover:shadow-inner duration-300' placeholder='Judul Tugas ...' required />
                    <p className='mt-2 text-sm text-red-500'>{formSave?.Error?.title?.[0]}</p>
                </div>

                <div className='mb-2 flex flex-col'>
                    <label htmlFor="deskripsi" className='text-[20px]'>Deskripsi Tugas</label>
                    <textarea name='deskripsi' id='deskripsi' className='border-2 p-1 rounded-md hover:shadow-inner duration-300 h-24' placeholder='Deskripsi Tugas ...' required />
                    <p className='mt-2 text-sm text-red-500'>{formSave?.Error?.deskripsi?.[0]}</p>
                </div>

                <div className='mb-4'>
                    <label htmlFor="taskType" className='text-[20px]'></label>
                    <select name="taskType" className='py-2 px-4 bg-gray-100 rounded-lg' required>
                        <option value="others">Others</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="event">Event</option>
                        <option value="task">Task</option>
                    </select>
                </div>

                <p className='text-sm text-red-500'>{formSave?.Error?.general}</p>

                <SaveButton label='save' />
            </form>
        </div>
    )
}

export default CreateNoteComponents;
