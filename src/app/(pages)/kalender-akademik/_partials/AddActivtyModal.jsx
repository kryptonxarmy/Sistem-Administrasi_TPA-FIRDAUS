'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddActivityModal({ isOpen, onClose, onSubmit }) {
  const [activity, setActivity] = React.useState({
    activity: '',
    date: '',
    description: '',
    completed: false,
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    onSubmit(activity);
    setActivity({ activity: '', date: '', description: '', completed: false });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="activity">Judul Kegiatan</Label>
            <Input
              id="activity"
              value={activity.activity}
              onChange={(e) => setActivity({ ...activity, activity: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="date"
              value={activity.date}
              onChange={(e) => setActivity({ ...activity, date: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              value={activity.description}
              onChange={(e) => setActivity({ ...activity, description: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}