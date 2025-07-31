'use client'
import React, { useState, useEffect } from 'react';
import { DeleteButton, EditButton } from '@/components/button';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from 'react-icons/ci';
import { Sidebar } from '@/components/sidebar';
import { Pointer } from '@/components/magicui/pointer';
import { LuMousePointer2 } from 'react-icons/lu';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import CreateNoteComponents from '@/components/create-form';
import { useSession, signOut } from "next-auth/react";
import { getNotes } from '@/lib/data';

const Notes = () => {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userNotes = await getNotes(token);
      setNotes(userNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Gagal memuat data notes");  
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleRefresh = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('notesUpdated', fetchNotes);
        return () => window.removeEventListener('notesUpdated', fetchNotes);
      }
    };
    handleRefresh();
  }, []);

  
useEffect(() => {
  const token = localStorage.getItem("authToken");
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !storedUser?.id) {
      router.push("/auth");
      return;
  }

  const username = storedUser.email;
  const match = username.match(/^(.+)@gmail\.com$/);
  const name = match ? match[1] : username; 
  storedUser.email = name;
  setUser(storedUser); 

  fetchNotes();
}, [router]);

  const handleSuccess = async () => {
    await fetchNotes(); 
    setShowModal(false); 
    router.push("/notes");
  };
  
  // Update your logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/auth");
  };


  if (status === "loading" || loading) return <p>Loading...</p>;

  return (
    <div className='gap-3 flex flex-col font-Instrument_Sans'>
      <Pointer>
        <LuMousePointer2 className='text-2xl text-indigo-600 fill-indigo-500 '/>
      </Pointer>
      <Sidebar/>
      <div className='p-4 sm:ml-60'>
        <div className='flex flex-row items-center ml-10 mt-10 gap-6'>
          <button onClick={() => signOut({ callbackUrl: "/auth" })} className='bg-black p-2 rounded-md group w-fit duration-300 hover:bg-primary/90'>
            <ChevronLeftIcon className='text-white transition-transform duration-300 group-hover:-translate-x-1' />
          </button>
          <div className='flex flex-col'>
            <p className='text-xl font-medium'>Halo, {user.email}!</p>
            <p className='text-4xl font-bold text-indigo-400'>Your Notes</p>
          </div>
        </div>
        <div className='grid xl:grid-cols-4 m-10 gap-6 border-2 p-4 border-gray-200 rounded-xl h-fit'>
          {notes.map((note) => (
            <div key={note.id} className='shadow-md rounded-lg p-4 border flex flex-col justify-between break-all'>
              <h1 className='font-bold text-2xl'>{note.title}</h1>
              <p className='text-sm'>{note.deskripsi}</p>
              <p className='text-sm bg-blue-300 p-1 rounded-xl w-fit'>{note.taskType}</p>
              <div className='mt-4 flex flex-row gap-2'>
                <EditButton id={note.id} />
                <DeleteButton id={note.id} />
              </div>
            </div>
          ))}
          <button onClick={() => setShowModal(true)} className='p-3 rounded-lg border-2 border-dashed duration-300 hover:bg-indigo-100 flex justify-center items-center text-3xl text-gray-400 h-56'>
            <CiCirclePlus />
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <Pointer>
            <LuMousePointer2 className='text-2xl text-indigo-600 fill-indigo-500 '/>
          </Pointer>
          <div className='bg-white p-6 rounded-lg shadow-lg w-[500px] relative'>
            <button className='absolute top-3 right-3' onClick={() => setShowModal(false)}>
              <XIcon className='text-gray-500 hover:text-gray-700' />
            </button>
            <CreateNoteComponents onSuccess ={handleSuccess}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
