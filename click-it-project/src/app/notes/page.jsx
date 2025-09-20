'use client'
import React, { useState, useEffect, useMemo } from 'react'; // Gabungkan semua import React
import { useTheme } from '@/lib/theme';
import { DeleteButton } from '@/components/button';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from 'react-icons/ci';
import { Sidebar } from '@/components/sidebar';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import CreateNoteComponents from '@/components/create-form';
import { getNotes } from '@/lib/data';
import { MdModeEditOutline } from 'react-icons/md';
import { getTaskTypeStyle } from '@/utils/taskTypeStyles';
import EditFormComponent from '@/components/edit-form';
import SearchBar from '@/components/search-notes';
import CategoryFilter from '@/components/bar-type';

const Notes = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState('created');
  const [loading, setLoading] = useState(true);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset ke halaman pertama saat mencari
  };

  // Fungsi untuk menangani perubahan kategori
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset ke halaman pertama saat mengganti kategori
  };

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 11;

  const bulanIndonesia = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    const hari = date.getDate();
    const bulan = bulanIndonesia[date.getMonth()];
    const tahun = date.getFullYear();
    const jam = date.getHours();
    const menit = date.getMinutes().toString().padStart(2, '0');
    return `${hari} ${bulan} ${tahun}, ${jam}.${menit}`;
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      // Pastikan note dan propertinya ada
      if (!note || !note.title || !note.deskripsi || !note.taskType) {
        return false;
      }
      
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           note.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || note.taskType === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchQuery, selectedCategory]);

  // Ganti sortedNotes dengan filteredNotes untuk sorting
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    return sortBy === 'created'
      ? new Date(b.tanggalDibuat) - new Date(a.tanggalDibuat)
      : new Date(b.tanggalDiubah) - new Date(a.tanggalDiubah);
  });

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(sortedNotes.length / notesPerPage);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userNotes = await getNotes(token);
      setNotes(userNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !storedUser?.id) {
      router.push("/auth");
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Token invalid");
      } catch (err) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        router.push("/auth");
      }
    };
    validateToken();

    // ambil nama dari email
    const username = storedUser.email;
    const match = username.match(/^(.+)@gmail\.com$/);
    storedUser.email = match ? match[1] : username;
    setUser(storedUser);

    fetchNotes();
  }, [router]);

  const handleSuccess = async () => {
    await fetchNotes();
    setShowModalAdd(false);
  };

  const handleDeleteSuccess = async () => {
    await fetchNotes();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`gap-3 flex flex-col min-h-screen font-Instrument_Sans ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Sidebar/>
      <div className='p-4 sm:ml-60'>
        <div className='flex flex-row items-center ml-10 mt-10 gap-6 max-[780px]:flex-col max-[780px]:items-start'>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("user");
              if (isDarkMode) toggleDarkMode();
              router.push("/auth");
            }}
            className="bg-black p-2 rounded-full group w-fit duration-300 hover:bg-primary/90"
          >
            <ChevronLeftIcon className="text-white transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <div className='flex flex-col'>
            <p className='text-2xl font-bold text-indigo-400'>Hello, {user?.email}!</p>
            <p className='text-lg'>Your Notes</p>
          </div>
          <div className="ml-auto max-[780px]:ml-0">
            <span>Sort by : </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-2 border rounded-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            >
              <option value="created">Newest Created</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>
        </div>
        <div className='mt-4'>
          <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
            isDarkMode={isDarkMode} 
          />
        </div>
        {/* Notes Grid */}
        <div className={`grid xl:grid-cols-4 m-10 gap-4  p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-2xl h-fit`}>
          {currentNotes.map((note) => (
            <div key={note.id}>
              <button onClick={() => { setShowDetailModal(true); setSelectedNote(note); }} className={`rounded-xl p-4 border-none flex flex-col justify-between break-all w-full text-left duration-200 h-60 ${isDarkMode ? ' text-black border-none shadow-xl hover:bg-gray-600 ' : 'text-black hover:shadow-xl'}  ${getTaskTypeStyle(note.taskType)}`}>
                <div>
                  <h1 className='font-bold text-xl'>
                    {note.title.length > 17  ? note.title.substring(0, 17 ) + "..." : note.title}
                  </h1>
                  <p className='text-sm'>
                    {note.deskripsi.length > 100 ? note.deskripsi.substring(0, 100)+ "..." : note.deskripsi}
                  </p>
                  <p className={`mt-2 text-sm  px-2 py-1 rounded-md w-fit  bg-white`}>{note.taskType}</p>
                  <p className='text-sm mt-1'>Created : {formatTanggal(note.tanggalDibuat)}</p>
                  <p className='text-sm mt-[2px]'>Updated : {formatTanggal(note.tanggalDiubah)}</p>
                </div>
              </button>
            </div>
          ))}
          <button onClick={() => setShowModalAdd(true)} className={`p-3 rounded-lg border-2 border-dashed border-gray-500 duration-300 hover:bg-indigo-100 flex justify-center items-center text-3xl text-gray-600 h-60` }>
            <CiCirclePlus />
          </button>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4 mb-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded-md border disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-indigo-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded-md border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal Add */}
      {showModalAdd && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-lg w-[500px] relative`}>
            <button className='absolute top-3 right-3' onClick={() => setShowModalAdd(false)}>
              <XIcon className='text-gray-500 hover:text-gray-700' />
            </button>
            <CreateNoteComponents onSuccess={handleSuccess}/>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showModalEdit && editingNote && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-lg w-[500px] relative`}>
            <button className='absolute top-3 right-3' onClick={() => setShowModalEdit(false)}>
              <XIcon className={`${isDarkMode ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} />
            </button>
            <EditFormComponent note={editingNote} onSuccess={() => {
              setShowModalEdit(false);
              fetchNotes();
              setEditingNote(null);
            }} />
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {showDetailModal && selectedNote && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 break-all'>
          <div className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg w-[800px] relative max-h-[80vh] overflow-y-auto`}>
            <button className='absolute top-3 right-3' onClick={() => setShowDetailModal(false)}>
              <XIcon className={`${isDarkMode ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} />
            </button>
            <h2 className='text-2xl font-bold'>{selectedNote.title}</h2>
            <p className='text-gray-400 mb-3'>{selectedNote.taskType} | {formatTanggal(selectedNote.tanggalDiubah)}</p>
            <div className='my-3 flex flex-row gap-2 items-center'>
              <button onClick={() => { setEditingNote(selectedNote); setShowModalEdit(true); }} className={`bg-yellow-200 flex items-center justify-center shadow-md hover:bg-yellow-400 duration-300 w-fit p-3 rounded-full text-sm ${isDarkMode ? 'text-black' : 'text-black'}`}>
                <MdModeEditOutline className='text-lg'/>
              </button>
              <DeleteButton id={selectedNote.id} onDeleteSuccess={handleDeleteSuccess} />
            </div>
            <p className='mb-4 whitespace-pre-line'>{selectedNote.deskripsi}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
