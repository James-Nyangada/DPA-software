"use client"

import * as React from "react"
import { AuthenticationSettings } from "@/components/authentication-settings"
import { EmailNotificationSettings } from "@/components/email-notification-settings"
import { CompanyDefaultsSettings } from "@/components/company-defaults-settings"
import { ComplianceSettings } from "@/components/compliance-settings"
import { AuditLogSettings } from "@/components/audit-log-settings"
import { PlatformConfiguration } from "@/components/platform-configuration"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import settingsData from "./settings-data.json"

export default function SettingsPage() {
  const [settings, setSettings] = React.useState(settingsData)

  const handleUpdateAuthentication = (authSettings) => {
    setSettings((prev) => ({
      ...prev,
      authentication: authSettings,
    }))
  }

  const handleUpdateEmail = (emailSettings) => {
    setSettings((prev) => ({
      ...prev,
      email: emailSettings,
    }))
  }

  const handleUpdateCompanyDefaults = (companySettings) => {
    setSettings((prev) => ({
      ...prev,
      companyDefaults: companySettings,
    }))
  }

  const handleUpdateCompliance = (complianceSettings) => {
    setSettings((prev) => ({
      ...prev,
      compliance: complianceSettings,
    }))
  }

  const handleUpdateAuditLog = (auditSettings) => {
    setSettings((prev) => ({
      ...prev,
      auditLog: auditSettings,
    }))
  }

  const handleUpdatePlatform = (platformSettings) => {
    setSettings((prev) => ({
      ...prev,
      platform: platformSettings,
    }))
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="px-4 py-4 md:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your platform configuration and preferences.</p>
          </div>
          <div className="flex-1 px-4 md:px-6">
            <Tabs defaultValue="authentication" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="authentication">🔐 Auth</TabsTrigger>
                <TabsTrigger value="email">📩 Email</TabsTrigger>
                <TabsTrigger value="company">🏢 Company</TabsTrigger>
                <TabsTrigger value="compliance">🛡️ Compliance</TabsTrigger>
                <TabsTrigger value="audit">📜 Audit</TabsTrigger>
                <TabsTrigger value="platform">⚙️ Platform</TabsTrigger>
              </TabsList>
              <TabsContent value="authentication" className="space-y-6">
                <AuthenticationSettings settings={settings.authentication} onUpdate={handleUpdateAuthentication} />
              </TabsContent>
              <TabsContent value="email" className="space-y-6">
                <EmailNotificationSettings settings={settings.email} onUpdate={handleUpdateEmail} />
              </TabsContent>
              <TabsContent value="company" className="space-y-6">
                <CompanyDefaultsSettings settings={settings.companyDefaults} onUpdate={handleUpdateCompanyDefaults} />
              </TabsContent>
              <TabsContent value="compliance" className="space-y-6">
                <ComplianceSettings settings={settings.compliance} onUpdate={handleUpdateCompliance} />
              </TabsContent>
              <TabsContent value="audit" className="space-y-6">
                <AuditLogSettings settings={settings.auditLog} onUpdate={handleUpdateAuditLog} />
              </TabsContent>
              <TabsContent value="platform" className="space-y-6">
                <PlatformConfiguration settings={settings.platform} onUpdate={handleUpdatePlatform} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
