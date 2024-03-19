<!-- PROJECT LOGO -->

[![Roots](https://i.imgur.com/4lrud7k.png)](https://roots.better-beginnings.agency)

## About the project

<img width="100%" alt="Project's thumbnail" src="https://i.imgur.com/JbWByDW.png">

# Real Estate Reimagined: Open, Accessible, Unmatched.

Searching for a property can often feel like wading through a swamp of confusion. Between navigating through pages of irrelevant listings to deciphering hidden fees, the journey to finding a new home or investment can quickly become overwhelming. This is compounded by interfaces that aren't intuitive, leaving users feeling lost and frustrated.

Our project takes a different path. By addressing the core issues that make property searching a daunting task, we offer a refreshingly straightforward experience. With us, it's all about bringing you closer to your ideal property without the hassle. Enjoy a clean, user-friendly interface that gets straight to the point, presenting you with options that align with your search criteria and expectations. No more battling through the fog of confusing listings and opaque information—just a clear, simple route to the properties that genuinely interest you.

### Built With

- [Next.js](https://nextjs.org/?ref=roots.better-beginnings.agency)
- [tRPC](https://trpc.io/?ref=roots.better-beginnings.agency)
- [React.js](https://reactjs.org/?ref=roots.better-beginnings.agency)
- [Tailwind CSS](https://tailwindcss.com/?ref=roots.better-beginnings.agency)
- [Supabase](https://supabase.com/?ref=roots.better-beginnings.agency)

## Contact us

Meet our sales team for any commercial inquiries.

<a href="https://cal.com/sales"><img src="https://cal.com/book-with-cal-dark.svg" alt="Book us with Cal.com"></a>

### Prerequisites

Here is what you need to be able to run Artifact.

- Node.js (Version: >=18.x)
- A Supabase project setup
- A Google Cloud key with the following APIs enabled:
  - Maps JavaScript
  - Maps Static
  - Places
  - Geocoding

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/Better-Beginnings/roots/fork). If you plan to distribute the code, keep the source code public to comply with [AGPLv3](https://github.com/Better-Beginnings/roots/blob/main/LICENSE).

   ```sh
   git clone https://github.com/Better-Beginnings/roots.git
   ```

2. Go to the project folder

   ```sh
   cd roots
   ```

3. Install packages with npm

   ```sh
   npm install
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`

5. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   ```sh
   nvm use
   ```

   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).

6. Run the project in development mode

   ```sh
   npm run dev
   ```
