# Team Setup Guide for Strapi

## 🎯 Overview

This guide explains how to share your Strapi instance with your team, including the database with all migrated content.

---

## 📦 What to Share

### **Option A: Git Repository (Recommended)**

**Include:**
- ✅ Strapi source code (`/strapi` folder)
- ✅ Docker configuration
- ✅ Database backup file
- ✅ Documentation

**Steps:**

1. **Export your database:**
   ```bash
   cd strapi
   chmod +x export-database.sh
   ./export-database.sh
   ```
   This creates: `database-backups/strapi_backup_YYYYMMDD_HHMMSS.sql`

2. **Commit the database backup:**
   ```bash
   # Create database-backups directory if it doesn't exist
   mkdir -p database-backups
   touch database-backups/.gitkeep
   
   # Add the latest backup
   git add database-backups/latest.sql
   git commit -m "Add initial database backup with migrated content"
   ```

3. **Push to GitHub:**
   ```bash
   # If not already initialized
   git init
   git add .
   git commit -m "Initial Strapi setup with migrated About Pages"
   
   # Add remote (replace with your repo URL)
   git remote add origin git@github.com:yourusername/reflection-dental-strapi.git
   git branch -M main
   git push -u origin main
   ```

### **Option B: Direct File Share**

If you prefer not to use Git:

1. **Export database** (same as above)
2. **Zip the strapi folder:**
   ```bash
   tar -czf strapi-complete.tar.gz strapi/
   ```
3. **Share via:**
   - Google Drive
   - Dropbox
   - Cloud storage
   - File transfer service

---

## 👥 Team Member Setup

Your teammates will follow these steps:

### **1. Clone/Download**

**If using Git:**
```bash
git clone git@github.com:yourusername/reflection-dental-strapi.git
cd strapi
```

**If using zip file:**
```bash
unzip strapi-complete.tar.gz
cd strapi
```

### **2. Start Docker containers:**
```bash
docker-compose up -d
```

### **3. Import the database:**
```bash
chmod +x import-database.sh
./import-database.sh database-backups/latest.sql
```

### **4. Access Strapi:**
```
http://localhost:1337/admin
```

### **5. Create admin account:**
Since admin users are NOT in the database export (for security), each team member creates their own admin account on first access.

---

## 🔐 Security Best Practices

### **What to EXCLUDE from Git:**

❌ **Never commit:**
- `.env` file with real passwords/secrets
- `node_modules/`
- Personal admin credentials
- Production API keys

✅ **Safe to commit:**
- `.env.example` (template with placeholder values)
- Database structure and content
- Source code
- Configuration files

### **Using .env.example:**

Create `.env.example` (safe for git):
```bash
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=strapi-db
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=CHANGE_ME

# Secrets (Change these!)
APP_KEYS=GENERATE_NEW_KEYS
API_TOKEN_SALT=GENERATE_NEW_SALT
ADMIN_JWT_SECRET=GENERATE_NEW_SECRET
TRANSFER_TOKEN_SALT=GENERATE_NEW_SALT
JWT_SECRET=GENERATE_NEW_SECRET
```

Team members copy to `.env` and update values.

---

## 🗄️ Database Sync Options

### **Option 1: One-time Setup (Simple)**

**Use for:** Initial setup only

1. Export database once
2. Commit to repo
3. Team imports on first setup
4. Each works independently after that

**Pros:** Simple, no ongoing sync
**Cons:** Databases diverge over time

### **Option 2: Regular Exports (Periodic Sync)**

**Use for:** Keep content in sync

1. One person is "content owner"
2. They export database weekly/daily
3. Commit updated backup
4. Team pulls and re-imports

**Script for content owner:**
```bash
./export-database.sh
git add database-backups/latest.sql
git commit -m "Update database backup - $(date +%Y-%m-%d)"
git push
```

**Script for team:**
```bash
git pull
./import-database.sh database-backups/latest.sql
```

**Pros:** Everyone has same content
**Cons:** Loses local changes on import

### **Option 3: Strapi Cloud Sync (Advanced)**

**Use for:** Real-time collaboration

- Use cloud database (RDS, Cloud SQL)
- All team members connect to same database
- No exports needed

**Requires:** 
- Cloud PostgreSQL database
- VPN or secure connection
- More complex setup

---

## 🔄 Recommended Workflow

### **For Small Teams (2-5 people):**

**Approach:** Designate a "content manager"

1. **Content Manager:**
   - Makes all content changes
   - Exports database weekly
   - Pushes to git

2. **Developers:**
   - Pull latest code + database
   - Import database
   - Work on frontend/features

### **For Larger Teams:**

**Approach:** Separate content and development

1. **Production Strapi:**
   - Hosted in cloud
   - Content team works here
   - Developers fetch data via API

2. **Local Strapi:**
   - Developers use local instance
   - Import production backup as needed
   - Test changes before production

---

## 📝 Step-by-Step: Pushing to GitHub

### **1. Prepare the Strapi folder:**

```bash
cd /Users/bittuboss/Documents/Dev/Github/FYLO/reflection-dental-care/strapi

# Export current database
./export-database.sh

# Check what's included
git status
```

### **2. Review what's committed:**

```bash
# Should see:
✅ docker-compose.yml
✅ Dockerfile
✅ .env.example (not .env!)
✅ app/src/ (source code)
✅ app/config/
✅ database-backups/latest.sql
✅ README.md
✅ export-database.sh
✅ import-database.sh

# Should NOT see:
❌ .env (secrets)
❌ node_modules/
❌ app/dist/
❌ database/postgres-data/
```

### **3. Create repository on GitHub:**

1. Go to https://github.com/new
2. Repository name: `reflection-dental-strapi`
3. Description: "Strapi CMS for Reflections Dental Care"
4. **Important:** Choose **Private** (contains database)
5. Don't initialize with README (we have one)
6. Click "Create repository"

### **4. Push to GitHub:**

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Strapi with migrated About Pages"

# Add remote (replace with your actual URL)
git remote add origin git@github.com:YOUR_USERNAME/reflection-dental-strapi.git

# Push
git branch -M main
git push -u origin main
```

### **5. Share with team:**

Send them:
1. Repository URL
2. Instructions to clone and setup
3. `.env` values (securely - Slack/email, NOT in git)

---

## 👥 Team Member Instructions

**Send this to your team:**

---

### **Quick Setup (5 minutes)**

1. **Clone the repository:**
   ```bash
   git clone git@github.com:YOUR_USERNAME/reflection-dental-strapi.git
   cd reflection-dental-strapi
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with values provided by team lead
   ```

3. **Start Strapi:**
   ```bash
   docker-compose up -d
   ```

4. **Import database:**
   ```bash
   chmod +x import-database.sh
   ./import-database.sh database-backups/latest.sql
   ```

5. **Access admin:**
   - Go to: http://localhost:1337/admin
   - Create your admin account
   - Start working!

---

## 🎯 What's Already Migrated

When team imports the database, they'll have:

✅ **4 About Pages:**
- Meet The Doctors (4 doctor profiles with photos)
- Meet The Team (7 team members with photos)
- Our Core Values
- RDC In The News (videos)

✅ **116 Images** in media library

✅ **6 Components:**
- Doctor Profile
- Team Member
- Core Value
- Text Content
- Video Embed
- Article Content

✅ **API Permissions** configured

---

## 🚨 Important Notes

### **For Team Lead:**

1. ⚠️ Never commit `.env` with real secrets
2. ⚠️ Use **private repository** (contains database)
3. ✅ Export database regularly if content changes
4. ✅ Document any custom configurations

### **For Team Members:**

1. ⚠️ Don't push local database changes without coordinating
2. ✅ Pull latest code before starting work
3. ✅ Create feature branches for development
4. ✅ Ask for `.env` values securely

---

## 📊 Database Size Considerations

Your current database is approximately:
- Content: ~50MB (text, structure)
- Images: ~100MB (media library)
- **Total: ~150MB**

**GitHub Considerations:**
- Files > 100MB need Git LFS
- If database > 100MB, use Git LFS or cloud storage
- Alternative: Host database backup on Google Drive

**To check size:**
```bash
ls -lh database-backups/latest.sql
```

If > 100MB, consider:
1. Git LFS: `git lfs track "*.sql"`
2. Cloud storage link in README
3. Split into smaller dumps

---

## ✅ Pre-Push Checklist

Before pushing to GitHub:

- [ ] Database exported to `database-backups/latest.sql`
- [ ] `.env` is in `.gitignore` (not committed)
- [ ] `.env.example` exists with placeholder values
- [ ] `README.md` has setup instructions
- [ ] `.gitignore` excludes sensitive files
- [ ] Repository is set to **Private**
- [ ] All scripts are executable (`chmod +x *.sh`)
- [ ] Tested: Fresh clone → import → works

---

## 🎉 You're Ready!

Your Strapi instance is now ready to share with your team. They'll have the complete system with all migrated content!

**Questions?**
- Check README.md in strapi folder
- Review Strapi docs: https://docs.strapi.io
- Contact team lead
