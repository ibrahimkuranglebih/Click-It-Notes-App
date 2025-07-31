'use client'
import { updateNote } from '@/lib/actions'
import React, { useActionState } from 'react'
import { SaveButton } from './button';
import {Task} from '@prisma/client';

/**
 * @param {Object} props
*@param {Task} props.note

**/

const EditFormComponent = ({note}) => {
    const updateNotesWithId = updateNote.bind(null, note.id);
    const [updateForm, setUpdateForm] = useActionState(updateNotesWithId, null);
    return (
      <div>
        <form action={setUpdateForm} className='shadow-lg p-10 rounded-xl w-[500px]'>
          <div className='font-bold text-3xl mb-2'>
            Update Notes
          </div>
                <div className='mb-2 flex flex-col'>
                    <label htmlFor="title" className='text-[20px]'>Judul Tugas</label>
                    <input type="text" name='title' id='title' className='border-2 p-1 rounded-md hover:bg-gray-100 duration-300' placeholder='Judul Tugas ...' defaultValue={note.title}/>
                    <div id="title-error" aria-live='polite' aria-atomic="true">
                        <p className='mt-2 text-sm text-red-500'>{updateForm?.Error?.title}</p>
                    </div>
                </div>
                <div className='mb-2 flex flex-col'>
                    <label htmlFor="deskripsi" className='text-[20px]'>Deskripsi Tugas</label>
                    <textarea type="textarea" name='deskripsi' id='deskripsi' className='border-2 p-1 rounded-md hover:bg-gray-100 duration-300' placeholder='Deskripsi Tugas ...' defaultValue={note.deskripsi}/>
                    <div id="deskripsi-error" aria-live='polite' aria-atomic="true">
                        <p className='mt-2 text-sm text-red-500'>{updateForm?.Error?.deskripsi}</p>
                    </div>
                </div>
                <SaveButton label='update' />
        </form>
      </div>
  )
}

export default EditFormComponent