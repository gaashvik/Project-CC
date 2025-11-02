# Project CC

A modern full-stack web application built with Next.js, featuring user authentication, state management, and database integration.

## 🚀 Features

- **Modern Frontend**: Built with Next.js 15 and React 19
- **Authentication**: Secure user authentication with Auth0
- **State Management**: Redux Toolkit with Redux Persist for state persistence
- **Styling**: Tailwind CSS with custom components and Radix UI primitives
- **Database**: SQLite integration with Better SQLite3
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-first responsive design approach

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.3
- **Runtime**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.16
- **UI Components**: Radix UI, Lucide React Icons
- **State Management**: Redux Toolkit, Redux Persist

### Backend & Database
- **Database**: SQLite with Better SQLite3
- **Authentication**: Auth0 NextJS SDK

### Development Tools
- **Language**: TypeScript 5
- **Linting**: ESLint
- **Build Tool**: Next.js built-in tooling
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gaashvik/project-cc.git
cd project-cc
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Auth0 Configuration
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# Database Configuration
DATABASE_PATH=./database/app.db
```

### 4. Initialize Database

```bash
npm run init-db
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
project-cc/
├── app/                    # Next.js app directory
├── components/             # Reusable UI components
├── database/              # Database configuration and scripts
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── redux/                 # Redux store and slices
├── src/                   # Additional source files
├── middleware.ts          # Next.js middleware
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run init-db` - Initialize SQLite database

## 🎨 Styling

This project uses Tailwind CSS for styling with:

- Custom color schemes and design tokens
- Responsive design utilities
- Component-based styling approach
- Radix UI primitives for accessible components

## 🔐 Authentication

Authentication is handled by Auth0, providing:

- Secure user login/logout
- Session management
- Protected routes
- User profile management

## 📊 State Management

Redux Toolkit is used for state management with:

- Centralized application state
- Persistent state across browser sessions
- Type-safe actions and reducers
- DevTools integration for debugging

## 🗄️ Database

The application uses SQLite for data storage:

- Lightweight, file-based database
- Better SQLite3 for improved performance
- TypeScript integration
- Database initialization scripts

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

This application can also be deployed on:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting service

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and not currently licensed for public use.

## 👤 Author

**Shubh Kamra** ([@gaashvik](https://github.com/gaashvik))

## 📞 Support

If you have any questions or need help with setup, please [open an issue](https://github.com/gaashvik/project-cc/issues) on GitHub.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Auth0 Documentation](https://auth0.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

*Built with ❤️ using Next.js and modern web technologies*