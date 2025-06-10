import {
  ThumbsUp,
  MessageSquare,
  Share,
  MoreHorizontal,
  Bell,
  FileText,
  Calendar,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
  Send,
  PlusCircle,
  ChevronDown,
  Filter,
  Settings,
} from "lucide-react"

const announcements = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      title: "Chief Executive Officer",
      department: "Executive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "2 hours ago",
    priority: "high",
    content: {
      title: "Q4 Financial Results and Strategic Direction",
      text: "Team, I'm pleased to share our Q4 financial results, which exceeded our targets by 15%. This achievement reflects the dedication and hard work of everyone across our organization. In the coming quarter, we'll be focusing on expanding our market presence in Europe and launching our new enterprise solution. I invite you to join our all-hands meeting this Friday at 2 PM to discuss our strategy in detail.",
      image: "/placeholder.svg?height=300&width=500",
    },
    engagement: {
      acknowledgments: 247,
      comments: 18,
      shares: 12,
    },
    category: "Company Update",
    pinned: true,
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      title: "IT Director",
      department: "Information Technology",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5 hours ago",
    priority: "medium",
    content: {
      title: "Scheduled System Maintenance",
      text: "Please be advised that we will be performing scheduled maintenance on our core systems this Saturday, June 12th, from 10:00 PM to 2:00 AM EST. During this period, the following services will be unavailable: CRM, Email, and Intranet. This maintenance is necessary to implement critical security updates and performance improvements. We apologize for any inconvenience this may cause.",
    },
    engagement: {
      acknowledgments: 89,
      comments: 23,
      shares: 5,
    },
    category: "IT",
  },
  {
    id: 3,
    author: {
      name: "Jennifer Martinez",
      title: "Head of Product",
      department: "Product",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "1 day ago",
    priority: "high",
    content: {
      title: "New Product Launch: Enterprise Analytics Suite",
      text: "I'm excited to announce that we'll be launching our Enterprise Analytics Suite next month. This platform represents a significant advancement in our product offerings, featuring AI-powered insights, customizable dashboards, and seamless integration with existing enterprise systems. The product team has been working tirelessly on this project for the past six months, and we're confident it will exceed our clients' expectations.",
      image: "/placeholder.svg?height=250&width=400",
    },
    engagement: {
      acknowledgments: 192,
      comments: 56,
      shares: 38,
    },
    category: "Product",
  },
  {
    id: 4,
    author: {
      name: "David Wilson",
      title: "HR Director",
      department: "Human Resources",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "2 days ago",
    priority: "medium",
    content: {
      title: "Annual Performance Review Process",
      text: "This is a reminder that our annual performance review process will begin next week. All managers should schedule meetings with their team members by June 20th. We've updated the review forms to better reflect our company values and objectives. You can find the new templates and guidelines on the HR portal. If you have any questions, please don't hesitate to contact the HR team.",
    },
    engagement: {
      acknowledgments: 156,
      comments: 34,
      shares: 12,
    },
    category: "HR",
  },
  {
    id: 5,
    author: {
      name: "Robert Taylor",
      title: "Facilities Manager",
      department: "Operations",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "3 days ago",
    priority: "low",
    content: {
      title: "Office Renovation Update",
      text: "The renovation of the east wing is progressing on schedule. The new meeting rooms and collaborative spaces will be available starting July 1st. We've incorporated your feedback regarding standing desks and natural lighting. The cafeteria will remain open during the renovation, but with limited seating. We appreciate your patience and flexibility during this improvement process.",
      image: "/placeholder.svg?height=200&width=350",
    },
    engagement: {
      acknowledgments: 103,
      comments: 15,
      shares: 7,
    },
    category: "Facilities",
  },
]

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "high":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          High Priority
        </span>
      )
    case "medium":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          Medium Priority
        </span>
      )
    case "low":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Standard
        </span>
      )
    default:
      return null
  }
}

const getCategoryIcon = (category) => {
  switch (category) {
    case "Company Update":
      return <Briefcase className="h-4 w-4" />
    case "IT":
      return <FileText className="h-4 w-4" />
    case "Product":
      return <PlusCircle className="h-4 w-4" />
    case "HR":
      return <Users className="h-4 w-4" />
    case "Facilities":
      return <Calendar className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function ProfessionalTeamAnnouncements() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Team Announcements</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Settings className="h-4 w-4 mr-2" />
                Notification Settings
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                New Announcement
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button className="px-3 py-1 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm">All</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">Company</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">Department</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">IT</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">HR</button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Sort by: Recent
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Announcements Feed */}
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Announcement Header */}
                <div className="bg-white p-6 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 border border-gray-200 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-700">
                          {getInitials(announcement.author.name)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{announcement.author.name}</h3>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{announcement.author.title}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {announcement.author.department}
                          </span>
                          <span>{announcement.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(announcement.priority)}
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Announcement Content */}
                <div className="px-6 pt-3">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{announcement.content.title}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{announcement.content.text}</p>
                  </div>

                  {/* Announcement Image */}
                  {announcement.content.image && (
                    <div className="mb-4 -mx-6">
                      <img
                        src={announcement.content.image || "/placeholder.svg"}
                        alt="Announcement content"
                        className="w-full h-auto object-cover border-y border-gray-100"
                      />
                    </div>
                  )}

                  {/* Category and Tags */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {getCategoryIcon(announcement.category)}
                      <span className="ml-1">{announcement.category}</span>
                    </span>
                    {announcement.pinned && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                        Pinned
                      </span>
                    )}
                  </div>

                  {/* Engagement Summary */}
                  <div className="flex items-center justify-between py-2 text-sm text-gray-500 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-blue-500" />
                      <span>{announcement.engagement.acknowledgments} acknowledgments</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>{announcement.engagement.comments} comments</span>
                      <span>{announcement.engagement.shares} shares</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Action Buttons */}
                <div className="py-2 px-6 bg-gray-50">
                  <div className="flex justify-between w-full">
                    <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Acknowledge
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comment
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">You</span>
                    </div>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-white rounded-md border border-gray-200 px-3 py-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-8 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Load more announcements
          </button>
        </div>
      </main>
    </div>
  )
}
