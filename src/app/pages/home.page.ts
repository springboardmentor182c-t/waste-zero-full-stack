import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "wz-home",
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="grid lg:grid-cols-2 gap-10 items-start">
      <div>
        <div
          class="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 text-emerald-700 px-3 py-1 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/50 dark:text-emerald-300"
        >
          <span class="h-2 w-2 rounded-full bg-primary"></span>
          Smart Waste Pickup & Recycling Platform
        </div>
        <h1
          class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Join the
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400"
            >Recycling</span
          >
          Revolution
        </h1>
        <p class="mt-4 text-slate-600 dark:text-neutral-300 max-w-xl">
          WasteZero is a digital platform to help users schedule waste pickups,
          categorize recyclables, and promote responsible waste management.
          Pickup agents are assigned intelligently based on location.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a routerLink="/register" class="btn btn-primary px-5 py-3"
            >Get Started</a
          >
          <a routerLink="/login" class="btn btn-outline px-5 py-3"
            >I already have an account</a
          >
        </div>
        <ul
          class="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-700 dark:text-neutral-300"
        >
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Schedule
            pickups
          </li>
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Categorize
            recyclables
          </li>
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Location-based
            agent matching
          </li>
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Real-time
            notifications
          </li>
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Volunteer
            opportunities
          </li>
          <li class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary"></span>Admin reporting
          </li>
        </ul>
      </div>

      <div>
        <div class="card">
          <div class="card-header">
            <div
              class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-neutral-300"
            >
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
                  />
                </svg>
              </span>
              OVERVIEW
            </div>
            <div class="text-lg font-semibold">Waste Statistics</div>
          </div>
          <div class="card-body space-y-5">
            <div class="grid grid-cols-2 gap-3">
              <div
                class="rounded-lg border border-slate-200 dark:border-neutral-800 p-4"
              >
                <div class="text-sm text-slate-500 dark:text-neutral-400">
                  Total Pickups
                </div>
                <div class="mt-1 text-2xl font-semibold">28</div>
              </div>
              <div
                class="rounded-lg border border-slate-200 dark:border-neutral-800 p-4"
              >
                <div class="text-sm text-slate-500 dark:text-neutral-400">
                  Recycled Items
                </div>
                <div class="mt-1 text-2xl font-semibold">635</div>
              </div>
              <div
                class="rounded-lg border border-slate-200 dark:border-neutral-800 p-4"
              >
                <div class="text-sm text-slate-500 dark:text-neutral-400">
                  CO₂ Saved (kg)
                </div>
                <div class="mt-1 text-2xl font-semibold">243</div>
              </div>
              <div
                class="rounded-lg border border-slate-200 dark:border-neutral-800 p-4"
              >
                <div class="text-sm text-slate-500 dark:text-neutral-400">
                  Volunteer Hours
                </div>
                <div class="mt-1 text-2xl font-semibold">87</div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2 text-sm">
                <span class="font-medium">Recycling Breakdown</span>
                <span class="text-slate-500 dark:text-neutral-400"
                  >This Month</span
                >
              </div>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span>Plastic</span><span>40%</span>
                  </div>
                  <div
                    class="h-2 rounded-full bg-slate-200 dark:bg-neutral-800"
                  >
                    <div
                      class="h-2 rounded-full bg-primary"
                      style="width:40%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span>Paper</span><span>25%</span>
                  </div>
                  <div
                    class="h-2 rounded-full bg-slate-200 dark:bg-neutral-800"
                  >
                    <div
                      class="h-2 rounded-full bg-green-400"
                      style="width:25%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span>Glass</span><span>15%</span>
                  </div>
                  <div
                    class="h-2 rounded-full bg-slate-200 dark:bg-neutral-800"
                  >
                    <div
                      class="h-2 rounded-full bg-emerald-300"
                      style="width:15%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span>E-Waste</span><span>10%</span>
                  </div>
                  <div
                    class="h-2 rounded-full bg-slate-200 dark:bg-neutral-800"
                  >
                    <div
                      class="h-2 rounded-full bg-amber-500"
                      style="width:10%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span>Organic</span><span>10%</span>
                  </div>
                  <div
                    class="h-2 rounded-full bg-slate-200 dark:bg-neutral-800"
                  >
                    <div
                      class="h-2 rounded-full bg-lime-500"
                      style="width:10%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Outcomes</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card p-5">
          <div class="flex items-center gap-3">
            <span
              class="h-8 w-8 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-7 8a7 7 0 0 1 14 0H5Z"
                /></svg
            ></span>
            <div class="font-semibold">Register & Login</div>
          </div>
          <p class="mt-3 text-sm text-slate-600 dark:text-neutral-400">
            Users can register, login and schedule waste pickups.
          </p>
        </div>
        <div class="card p-5">
          <div class="flex items-center gap-3">
            <span
              class="h-8 w-8 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3v1.5M6 3v1.5M9 3v1.5m3-1.5v1.5m3-1.5v1.5m3-1.5V3M3 7.5h18M4.5 12h15M6 16.5h12"
                /></svg
            ></span>
            <div class="font-semibold">Categorize Waste</div>
          </div>
          <p class="mt-3 text-sm text-slate-600 dark:text-neutral-400">
            Waste is categorized (plastic, organic, e-waste, etc.).
          </p>
        </div>
        <div class="card p-5">
          <div class="flex items-center gap-3">
            <span
              class="h-8 w-8 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  d="M12 3a9 9 0 1 1-6.364 2.636A9 9 0 0 1 12 3Zm1 4h-2v6h6v-2h-4V7Z"
                /></svg
            ></span>
            <div class="font-semibold">Smart Matching</div>
          </div>
          <p class="mt-3 text-sm text-slate-600 dark:text-neutral-400">
            Agents are notified and assigned dynamically; users get alerts and
            stats.
          </p>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Modules</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card p-5">
          <div class="font-semibold">User Management</div>
          <p class="mt-2 text-sm text-slate-600 dark:text-neutral-400">
            Learn more on the dashboard after you create an account.
          </p>
        </div>
        <div class="card p-5">
          <div class="font-semibold">Opportunity Management</div>
          <p class="mt-2 text-sm text-slate-600 dark:text-neutral-400">
            Learn more on the dashboard after you create an account.
          </p>
        </div>
        <div class="card p-5">
          <div class="font-semibold">Matching & Communication</div>
          <p class="mt-2 text-sm text-slate-600 dark:text-neutral-400">
            Learn more on the dashboard after you create an account.
          </p>
        </div>
        <div class="card p-5">
          <div class="font-semibold">Administration & Reporting</div>
          <p class="mt-2 text-sm text-slate-600 dark:text-neutral-400">
            Learn more on the dashboard after you create an account.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {}
