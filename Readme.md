# 📂 Node.js File Manager
**Pure Node.js CLI tool for advanced file operations with system diagnostics**

## 🚀 Quick Start
```bash
npm run start -- --username=your_name
```
> **Note**: Escape spaces in paths: `cd Path\ with\ Spaces`

## 🔍 Core Commands

### 🗂 Navigation
| Command | Description          | Example                  |
|---------|----------------------|--------------------------|
| `up`    | Move up              | `up`                     |
| `cd`    | Change directory     | `cd path/to/dir`         |
| `ls`    | List contents (folders first) | `ls`          |

### 📄 File Operations
| Command | Description          | Example                  |
|---------|----------------------|--------------------------|
| `cat`   | Read file            | `cat file.txt`           |
| `add`   | Create file          | `add new.txt`            |
| `rn`    | Rename file          | `rn old.txt new.txt`     |
| `cp`    | Copy file            | `cp file.txt backup/`    |
| `mv`    | Move file            | `mv file.txt archive/`   |
| `rm`    | Delete file          | `rm obsolete.txt`        |

### 💻 System Info
```bash
os --[option]
```
| Option          | Info                  |
|-----------------|-----------------------|
| `--EOL`         | End-of-Line chars     |
| `--cpus`        | CPU specs             |
| `--homedir`     | Home directory        |
| `--username`    | System user           |
| `--architecture`| Node.js architecture  |

### 🔐 Security & Compression
| Command       | Description           | Example                  |
|---------------|-----------------------|--------------------------|
| `hash`        | File hash             | `hash document.pdf`      |
| `compress`    | Brotli compression    | `compress in.txt out.br` |
| `decompress`  | Brotli decompression  | `decompress in.br out.txt` |

## ⚙️ Technical Highlights
- **100% Node.js** (no external dependencies)
- **Streams API** for memory-efficient operations
- **Cross-platform** support
- **Error-resistant** design
- **Asynchronous** processing

## 💡 Example Session
```bash
mkdir Projects
cd Projects
add demo.txt
cp demo.txt backup/
os --cpus
hash demo.txt
compress demo.txt demo.txt.br
```
