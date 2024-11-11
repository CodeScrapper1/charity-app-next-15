## 🚨 Tutorial

This repository contains the corresponding tutorial available on our YouTube channel, <a href="https://www.youtube.com/@CodeScrapperOfficial/videos" target="_blank"><b>Code Scrapper</b></a>.

## <a name="introduction">🤖 Introduction</a>

Our Charity App is an impactful platform built to facilitate seamless and transparent charitable contributions. Designed in Next.js with Prisma and MongoDB, the app empowers organizations and donors with features that make donating, tracking, and managing funds efficient and intuitive.

With a focus on user-friendly interactions, our app provides:

Customizable Donation Campaigns: Charities can create and manage campaigns with clear goals, timelines, and updates.
Secure Donor Management: A secure system for storing and managing donor information, ensuring transparency and trust.
User-Centric Design: Built with Next UI for a streamlined experience, allowing donors to easily navigate and contribute.
Impact Reporting: Charities can share the direct impact of donations, creating a strong bond between donors and recipients.
This Charity App is ideal for organizations looking to build meaningful connections with donors, increase transparency, and enhance their social impact with a modern, accessible interface.

## <a name="tech-stack">Tech Stack</a>

- Next.js 15
- MongoDB
- TypeScript
- Next-Auth
- Primsa
- Next UI
- Tailwind Css

## <a name="quick-start">Integration and Installation Process</a>

Follow these steps to set up the project locally on your device.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

**Clone this Project**

```bash
git clone https://github.com/CodeScrapper1/charity-app-next-15.git
cd charity-app-next-15
```

**Installation**

Install dependencies using yarn:

```bash
yarn
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
DATABASE_URL=""

AUTH_SECRET=""
NEXTAUTH_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_CLOUDINARY_NAME=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_FRONTEND_URL=
```

**Running the Project using yarn**

```bash
yarn run dev
```
