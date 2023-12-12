# 🚀 Contentful-TagGrabber 🚀

Just a tool to find all of the public and private tags in Contentful and what entries and types they are used in.

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/shanonplace/Contentful-TagGrabber
   ```
2. Navigate to the project directory:
   ```bash
   cd contentful-taggrabber
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## 🏃‍♀️ Usage

Run the application with the following command:

```bash
node index.js
```

## 📄 Output Format

The output format is as follows:

```bash
tagname, tagID, entryID, entryTypeID
```

To redirect the output into a CSV file, use the following command:

```bash
node index.js > output.csv
```
