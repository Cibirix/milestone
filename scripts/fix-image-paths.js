const fs = require('fs')
const path = require('path')

const basePath = '/test'
const outDir = path.join(process.cwd(), 'out')

// Function to recursively find files by extension
const findFiles = (dir, extensions, fileList = []) => {
  const files = fs.readdirSync(dir)
  
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList)
    } else if (extensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

// Fix image paths in HTML and JSON files
const fixImagePaths = () => {
  const htmlFiles = findFiles(outDir, ['.html'])
  const jsonFiles = findFiles(outDir, ['.json', '.txt'])
  
  // Fix HTML files
  htmlFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8')
    
    // Fix image src attributes that start with / but not with /test
    content = content.replace(
      /src="\/(?!test\/)([^"]+)"/g,
      `src="${basePath}/$1"`
    )
    
    // Fix background-image URLs in style attributes
    content = content.replace(
      /background-image:\s*url\(["']?\/(?!test\/)([^"')]+)["']?\)/g,
      `background-image: url(${basePath}/$1)`
    )
    
    fs.writeFileSync(filePath, content, 'utf8')
  })
  
  // Fix JSON files (for client-side navigation data)
  jsonFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8')
    
    // Fix image paths in JSON strings
    content = content.replace(
      /"\/(?!test\/)(brand|services|gallery|images|hardmix-logo)([^"]+)"/g,
      `"${basePath}/$1$2"`
    )
    
    fs.writeFileSync(filePath, content, 'utf8')
  })
  
  console.log(`Fixed image paths in ${htmlFiles.length} HTML files and ${jsonFiles.length} JSON/TXT files`)
}

fixImagePaths()


