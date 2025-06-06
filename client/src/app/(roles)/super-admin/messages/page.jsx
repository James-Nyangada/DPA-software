"use client"

import * as React from "react"
import { MessageList } from "@/components/message-list"
import { ConversationView } from "@/components/conversation-view"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

import data from "./data.json"

export default function MessagesPage() {
  const [conversations, setConversations] = React.useState(data.conversations)
  const [selectedConversation, setSelectedConversation] = React.useState(null)
  const [isMobileView, setIsMobileView] = React.useState(false)
  const [showList, setShowList] = React.useState(true)

  // Check if we're in mobile view
  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)

    return () => {
      window.removeEventListener("resize", checkMobileView)
    }
  }, [])

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)

    // If unread, mark as read
    if (conversation.unread) {
      setConversations(conversations.map((c) => (c.id === conversation.id ? { ...c, unread: false } : c)))
    }

    // In mobile view, hide the list when a conversation is selected
    if (isMobileView) {
      setShowList(false)
    }
  }

  // Handle archiving a conversation
  const handleArchiveConversation = (conversationId) => {
    setConversations(conversations.map((c) => (c.id === conversationId ? { ...c, status: "archived" } : c)))

    // If the archived conversation is currently selected, deselect it
    if (selectedConversation && selectedConversation.id === conversationId) {
      setSelectedConversation(null)
      if (isMobileView) {
        setShowList(true)
      }
    }
  }

  // Handle back button in mobile view
  const handleBack = () => {
    setShowList(true)
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="px-4 py-4 md:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Messages & Support</h1>
            <p className="text-muted-foreground">Manage support conversations with company admins and users.</p>
          </div>
          <div className="flex flex-1 overflow-hidden">
            {/* Message list - hidden on mobile when conversation is selected */}
            <div className={`border-r ${isMobileView ? (showList ? "flex w-full" : "hidden") : "flex w-1/3"}`}>
              <MessageList conversations={conversations} onSelectConversation={handleSelectConversation} />
            </div>

            {/* Conversation view - shown on mobile only when conversation is selected */}
            <div className={`${isMobileView ? (showList ? "hidden" : "flex w-full") : "flex w-2/3"}`}>
              <ConversationView
                conversation={selectedConversation}
                onBack={handleBack}
                onArchive={handleArchiveConversation}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
