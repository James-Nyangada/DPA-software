"use client"

import * as React from "react"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { CompanySubscriptions } from "@/components/company-subscriptions"
import { PaymentLogs } from "@/components/payment-logs"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import plansData from "./plans-data.json"
import subscriptionsData from "./subscriptions-data.json"
import paymentLogsData from "./payment-logs-data.json"

export default function BillingPage() {
  const [plans, setPlans] = React.useState(plansData)
  const [subscriptions, setSubscriptions] = React.useState(subscriptionsData)
  const [paymentLogs, setPaymentLogs] = React.useState(paymentLogsData)

  const handleUpdatePlans = (updatedPlans) => {
    setPlans(updatedPlans)
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="px-4 py-4 md:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Billing & Plans</h1>
            <p className="text-muted-foreground">Manage subscription plans and company billing.</p>
          </div>
          <div className="flex-1 px-4 md:px-6">
            <Tabs defaultValue="plans" className="space-y-6">
              <TabsList>
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
                <TabsTrigger value="companies">Company Subscriptions</TabsTrigger>
                <TabsTrigger value="logs">Payment Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="plans" className="space-y-6">
                <SubscriptionPlans plans={plans} onUpdatePlans={handleUpdatePlans} />
              </TabsContent>
              <TabsContent value="companies" className="space-y-6">
                <CompanySubscriptions subscriptions={subscriptions} plans={plans} />
              </TabsContent>
              <TabsContent value="logs" className="space-y-6">
                <PaymentLogs logs={paymentLogs} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
