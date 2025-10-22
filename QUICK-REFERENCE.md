# ⚡ Quick Reference - Strapi Deployment

## 🚀 Deploy in 5 Commands

```bash
cd strapi
./export-database.sh
./cleanup-for-github.sh
git init && git add . && git commit -m "Initial Strapi setup"
git remote add origin git@github.com:USER/REPO.git && git push -u origin main
```

---

## 👥 Team Setup in 3 Commands

```bash
git clone git@github.com:USER/REPO.git && cd REPO
cp .env.example .env  # Edit with real values
docker-compose up -d && ./import-database.sh database-backups/latest.sql
```

---

## 📊 What's Included

| Item | Status | Details |
|------|--------|---------|
| About Pages | ✅ 4 pages | Meet Doctors, Team, Values, News |
| Images | ✅ 116 images | All doctor/team photos |
| Components | ✅ 6 types | Profile, team, video, text, etc. |
| Database | ✅ ~16MB | Ready for GitHub |
| Docker | ✅ Ready | PostgreSQL + Strapi |

---

## 🔐 Security

**✅ Safe to commit:**
- Source code
- `.env.example`
- Database backup
- Documentation

**❌ Never commit:**
- `.env` (real secrets)
- `node_modules/`
- Personal credentials

---

## 📝 Key Files

```
strapi/
├── README.md                    # Setup instructions
├── TEAM-SETUP-GUIDE.md         # Team onboarding
├── DEPLOY-TO-GITHUB.md         # This deployment guide
├── docker-compose.yml          # Docker config
├── .env.example                # Template (safe)
├── .env                        # Real values (NOT in git)
├── export-database.sh          # Export DB
├── import-database.sh          # Import DB
├── cleanup-for-github.sh       # Prepare for push
└── database-backups/
    └── latest.sql              # Full database
```

---

## 🗄️ Database Options

### Small Team (< 5 people)
```bash
# Include in git (if < 100MB)
git add database-backups/latest.sql
```

### Large Team or Big DB
```bash
# Host externally
# Upload to: Google Drive, Dropbox, S3
# Link in README
```

---

## 🔄 Update Workflow

### Content Owner
```bash
./export-database.sh
git add database-backups/latest.sql
git commit -m "Update DB"
git push
```

### Team Members
```bash
git pull
./import-database.sh database-backups/latest.sql
```

---

## ⚡ Common Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild
docker-compose up -d --build

# Database shell
docker-compose exec strapi-db psql -U strapi
```

---

## 🎯 Access Points

- **Admin:** http://localhost:1337/admin
- **API:** http://localhost:1337/api/about-pages
- **DB:** localhost:5432

---

## ✅ Pre-Push Checklist

- [ ] Database exported
- [ ] `.env` not committed
- [ ] Repo set to Private
- [ ] README exists
- [ ] Scripts executable
- [ ] Tested fresh clone

---

## 🚨 Troubleshooting

**Can't push:**
```bash
git remote -v  # Check remote URL
git push -f origin main  # Force push (careful!)
```

**Import fails:**
```bash
docker-compose restart strapi-db
./import-database.sh database-backups/latest.sql
```

**Port conflict:**
```bash
# Change in docker-compose.yml:
ports:
  - "3000:1337"  # Use port 3000 instead
```

---

## 📞 Help

- **Docs:** See README.md, TEAM-SETUP-GUIDE.md
- **Strapi:** https://docs.strapi.io
- **Docker:** https://docs.docker.com

---

**Created:** $(date +%Y-%m-%d)
**Status:** ✅ Ready for deployment
