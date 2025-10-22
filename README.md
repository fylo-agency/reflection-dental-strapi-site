# 🚀 Strapi Deployment Guide for Team

## 📦 What's Included

This repository contains a **ready-to-use Strapi CMS** with:
- ✅ About Page content type with 4 migrated pages
- ✅ 6 dynamic components (doctor-profile, team-member, etc.)
- ✅ All images uploaded (116 images in media library)
- ✅ PostgreSQL database with all data
- ✅ Docker setup for easy deployment

---

## 🎯 Quick Start (5 Minutes)

### **Prerequisites:**
- Docker & Docker Compose installed
- Git

### **Setup Steps:**

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd strapi
   ```

2. **Start Strapi:**
   ```bash
   docker-compose up -d
   ```

3. **Wait for startup (30 seconds):**
   ```bash
   docker-compose logs -f strapi
   # Wait for: "Server started on port 1337"
   ```

4. **Access Strapi:**
   - Admin: http://localhost:1337/admin
   - API: http://localhost:1337/api

---

## 🔐 First Time Login

**Important:** On first startup, you need to create an admin account.

1. Go to: http://localhost:1337/admin
2. Fill in the registration form:
   - First Name: Your Name
   - Email: your-email@example.com
   - Password: (strong password)
3. Click "Let's start"

---

## 📊 What Data is Available

### **Content Types:**
- **About Page** (4 entries):
  - Meet The Doctors
  - Meet The Team
  - Our Core Values
  - RDC In The News

### **Components:**
- `sections.doctor-profile` - Doctor profiles with bio, images
- `sections.team-member` - Team member profiles
- `sections.core-value` - Core values
- `sections.text-content` - Text sections
- `sections.video-embed` - Video embeds
- `sections.article-content` - Article content

### **Media:**
- 116 images in media library
- Doctor profile photos
- Lifestyle images
- Team member photos
- Logos and badges

---

## 🔧 Common Commands

### **Start Strapi:**
```bash
docker-compose up -d
```

### **Stop Strapi:**
```bash
docker-compose down
```

### **View Logs:**
```bash
docker-compose logs -f
```

### **Restart Strapi:**
```bash
docker-compose restart
```

### **Rebuild (after code changes):**
```bash
docker-compose up -d --build
```

---

## 📁 Project Structure

```
strapi/
├── docker-compose.yml      # Docker orchestration
├── Dockerfile              # Strapi container setup
├── .env                    # Environment variables
├── app/                    # Strapi application
│   ├── src/
│   │   ├── api/           # API routes & controllers
│   │   │   └── about-page/
│   │   └── components/    # Reusable components
│   │       └── sections/  # Page sections
│   ├── config/            # Strapi configuration
│   ├── database/          # Database migrations
│   └── package.json       # Dependencies
└── README.md              # This file
```

---

## 🌐 API Endpoints

### **Get All About Pages:**
```bash
GET http://localhost:1337/api/about-pages
```

### **Get Single Page with Sections:**
```bash
GET http://localhost:1337/api/about-pages?filters[slug][$eq]=meet-the-doctors&populate[sections][populate]=*
```

### **Example Response:**
```json
{
  "data": [
    {
      "id": 2,
      "title": "Meet The Doctors",
      "slug": "meet-the-doctors",
      "sections": [
        {
          "__component": "sections.doctor-profile",
          "name": "Lance R. Schmidt, DDS",
          "bio": "...",
          "profileImage": {...},
          "lifestyleImage": {...}
        }
      ]
    }
  ]
}
```

---

## 🔑 API Permissions

**Already configured** for public access:
- ✅ `find` - List all pages
- ✅ `findOne` - Get single page
- ✅ `create` - Create new pages
- ✅ `update` - Update existing pages

To modify:
1. Go to Settings → Roles → Public
2. Scroll to "About-page"
3. Check/uncheck permissions
4. Save

---

## 💾 Database Information

- **Type:** PostgreSQL 15
- **Host:** strapi-db (Docker internal)
- **Port:** 5432 (exposed on host)
- **Database:** strapi
- **Username:** strapi
- **Password:** strapi_password_123

### **Connect to Database:**
```bash
docker-compose exec strapi-db psql -U strapi -d strapi
```

---

## 🔄 Backup & Restore

### **Backup Database:**
```bash
docker-compose exec strapi-db pg_dump -U strapi strapi > backup.sql
```

### **Restore Database:**
```bash
cat backup.sql | docker-compose exec -T strapi-db psql -U strapi -d strapi
```

---

## 📝 Working with Content

### **View Content:**
1. Login to admin: http://localhost:1337/admin
2. Click "Content Manager" (left sidebar)
3. Click "About Page" under Collection Types
4. See all 4 imported pages

### **Edit Content:**
1. Click on any page
2. Modify text, images, sections
3. Click "Save"
4. Click "Publish" to make live

### **Add New Page:**
1. Click "Create new entry"
2. Fill in:
   - Title
   - Slug
   - Hero Heading
   - Add sections using "+ Add a component"
3. Save & Publish

---

## 🛠️ Troubleshooting

### **Port 1337 already in use:**
```bash
# Stop any existing Strapi instance
docker-compose down

# Or change port in docker-compose.yml:
ports:
  - "3000:1337"  # Change 1337 to 3000
```

### **Database connection error:**
```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart strapi-db

# Check database logs
docker-compose logs strapi-db
```

### **Strapi won't start:**
```bash
# View logs
docker-compose logs strapi

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

### **Can't login to admin:**
```bash
# Reset admin password
docker-compose exec strapi npm run strapi admin:reset-user-password -- --email=admin@example.com --password=NewPassword123
```

---

## 🔐 Security Notes

### **Important for Production:**

1. **Change default passwords:**
   - Edit `.env` file
   - Change `DATABASE_PASSWORD`
   - Change all secret keys (`APP_KEYS`, `JWT_SECRET`, etc.)

2. **Use strong secrets:**
   ```bash
   # Generate new secrets
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **Restrict API permissions:**
   - Go to Settings → Roles → Public
   - Uncheck `create` and `update` if public shouldn't modify content

4. **Enable HTTPS:**
   - Use a reverse proxy (nginx, Caddy)
   - Get SSL certificate (Let's Encrypt)

---

## 🎨 Frontend Integration

### **React/Vue/Next.js Example:**

```javascript
// Fetch all about pages
const response = await fetch('http://localhost:1337/api/about-pages?populate[sections][populate]=*');
const data = await response.json();

// Render doctor profiles
data.data.forEach(page => {
  page.sections.forEach(section => {
    if (section.__component === 'sections.doctor-profile') {
      console.log(section.name);
      console.log(section.profileImage.url);
    }
  });
});
```

---

## 📞 Support

**Common Issues:**
- Check Docker is running: `docker ps`
- Check logs: `docker-compose logs -f`
- Restart: `docker-compose restart`

**Need Help?**
- Strapi Docs: https://docs.strapi.io
- Docker Docs: https://docs.docker.com

---

## ✅ Quick Verification Checklist

After starting Strapi, verify:
- [ ] Can access http://localhost:1337/admin
- [ ] Can login/create admin account
- [ ] See 4 About Pages in Content Manager
- [ ] Can view "Meet The Doctors" page
- [ ] See doctor profiles with images
- [ ] API returns data: http://localhost:1337/api/about-pages

---

## 🎉 You're Ready!

Your Strapi CMS is now running with all migrated content. Start building your frontend or continue editing content in the admin panel!

**Next Steps:**
1. Explore the Content Manager
2. Review API endpoints
3. Start building your frontend
4. Add more content types as needed
