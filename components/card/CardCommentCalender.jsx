import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock } from "lucide-react";


export default function CardTCommentCalender({ note }) {
  console.log("this is note : ",note);

  return (
    <Card className="py-4 h-[400px] flex flex-col rounded-large shadow-sm">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-2">
          <Image
            src={commentlogo}
            className="w-7 h-7 object-contain"
            alt="comment-icon"
          />
          <h1 className="text-title text-large font-semibold">All Comments</h1>
        </div>
      </CardHeader>

      <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1">
            {note?.payload.map((data, index) => (
              <div key={index} className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors"> 
              <Image
                src={data.uerId?.userProfile || profile}
                className="w-7 h-7 object-cover rounded-full"
                alt="profile"
                width={28}
                height={28}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {data.uerId?.username || "kdey piseth"}
                  </h3>
                  <button className="text-green-500 hover:text-green-600 transition-colors">
                    <SquarePen size={15} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {data.noted}
                </p>

                <div className="flex items-center justify-end gap-1">
                  <AlarmClock className="text-green-500 w-5 h-5" />
                  <span className="text-xs text-green-500 font-medium">
                    {new Date(data.notedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
            ))}
      </CardBody>
    </Card>
  );
}
