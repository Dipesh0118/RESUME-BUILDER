import { Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resumeinfo.resume.resumeId)
      .then(resp => {
        console.log(resp);
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      })
      .catch(error => {
        console.error("Error deleting resume:", error);
        toast.error('Failed to delete resume. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div>
      <Link to={`/dashboard/resume/${resumeinfo.resume.resumeId}/edit`}>
        <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
          style={{ borderColor: resumeinfo.resume.themeColor }}>
          <div className='flex items-center justify-center h-[180px]'>
            <img src="/cv.png" width={80} height={80} alt="Resume Icon" />
          </div>
        </div>
      </Link>
      <div className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg'
        style={{ background: resumeinfo.resume.themeColor }}>
        <h2 className='text-sm'>{resumeinfo.resume.jobTitle}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resumeinfo.resume.resumeId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resumeinfo.resume.resumeId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {/* Implement download functionality */}}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
