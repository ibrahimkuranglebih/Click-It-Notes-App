import EditFormComponent from '@/components/edit-form';
import { getNotesByID } from '@/lib/data';
import React from 'react'

const EditNote = async ({params}) => {
  const {id} = await params;
  const note = await getNotesByID(id);
  return (
    <div className='flex justify-center items-center h-screen'>
      <EditFormComponent note = {note}/>
    </div>
  )
}

export default EditNote