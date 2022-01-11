# Next.js + Agility CMS Sync + SSG

## Get Started

Sign up for an [Agility CMS Blog Starter](https://account.agilitycms.com/sign-up?product=agility-free) instance.

1. Clone this repository (git clone https://github.com/joelvarty/nextjs-agility-sync.git)
2. Run `npm install`
3. Modify the `.env.example` and place your own _guid_, _apiKeys_ and _security key_

### Refresh the Agility CMS Data

```
npm run cms-pull
```

### Run it Locally

```
npm run dev
```

### Test Static Builds

```
npm run deploy
```

Check the ./out folder...

## Push it to a new GitHub Repo

- Login to http://github.com, create a new repo
- Init repo `git init`
- Remove the existing remote `git remote rm origin`
- Add new remote `git remote add origin ...`
- Push it up to the main branch `git push -u origin main`

## Deploy to Vercel

- Create a Vercel Account (https://vercel.com)
- Create a new project based on the Git Repo

## Setup Domain Configuration in Agility CMS

- Take the link from the new project and add it to Domain Config in Settings

## Test Live and Preview Mode

- From the Pages tree in Agility CMS

## A Tour Of the Code

- How NextJS works
- How Agility CMS works with NextJS
- Routing
- Modules + Extra Data
- Dynamic Pages
- SEO
- How Preview Works

## Do Some Work

- Update the Jumbo Tron
- Update the Global Header
- Look at SEO for Posts

## Check out Tailwind UI

- https://tailwindui.com/
