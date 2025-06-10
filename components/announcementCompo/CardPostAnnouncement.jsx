import { ThumbsUp, Bookmark, EllipsisVertical, Pin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CardPostAnnouncement() {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Card className='w-full bg-white shadow-sm border border-gray-200'>
        <CardContent className='p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden'>
                <img
                  src='https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg'
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <h3 className='font-bold text-title'>{'Pu Kdet'}</h3>
                <p className='text-sm text-description'>{'12/05/2002'}</p>
              </div>
            </div>
            <Button variant='ghost' size='sm' className='text-title hover:text-primary'>
              <EllipsisVertical className='w-5 h-5' />
            </Button>
          </div>

          {/* Post Title */}
          <h2 className='text-lg font-semibold text-title mb-4'>{'Hello World'}</h2>

          {/* Post Content */}
          <div className='text-description mb-6 leading-relaxed'>
            <p>
              {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iure magni deleniti repudiandae esse laborum, molestiae quidem fuga explicabo debitis provident voluptatem quisquam. Veritatis eius necessitatibus ullam possimus voluptates. Sint.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-between border-t border-gray-100 pt-4'>
            <div className='flex items-center gap-6'>
              <Button variant='ghost' size='sm' className='text-title hover:text-primary p-0'>
                <ThumbsUp className='w-4 h-4 mr-2' />
                Like
              </Button>
              <Button variant='ghost' size='sm' className='text-title hover:text-primary p-0'>
                <Bookmark className='w-4 h-4 mr-2' />
                Bookmark
              </Button>
            </div>
            <span className='text-sm text-title'>{'Read 11'}</span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
