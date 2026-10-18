const fs = require('fs');
const path = require('path');

const resources = [
  { name: 'grades', model: 'grade', dto: 'data: any' },
  { name: 'subjects', model: 'subject', dto: 'data: any' },
  { name: 'lessons', model: 'lesson', dto: 'data: any' },
  { name: 'questions', model: 'question', dto: 'data: any' },
  { name: 'institutions', model: 'institution', dto: 'data: any' }
];

for (const res of resources) {
  const servicePath = path.join(__dirname, 'src', res.name, `${res.name}.service.ts`);
  if (fs.existsSync(servicePath)) {
    let content = fs.readFileSync(servicePath, 'utf8');
    if (!content.includes('update(id: string,')) {
      const updateMethod = `\n  update(id: string, data: any) {\n    return this.prisma.${res.model}.update({ where: { id }, data });\n  }\n`;
      content = content.replace('async remove(id: string)', updateMethod + '  async remove(id: string)');
      // If it doesn't have 'async remove' maybe it just has 'remove'
      if (content === fs.readFileSync(servicePath, 'utf8')) {
        content = content.replace('remove(id: string)', updateMethod + '  remove(id: string)');
      }
      fs.writeFileSync(servicePath, content);
      console.log(`Updated ${res.name}.service.ts`);
    }
  }

  const controllerPath = path.join(__dirname, 'src', res.name, `${res.name}.controller.ts`);
  if (fs.existsSync(controllerPath)) {
    let content = fs.readFileSync(controllerPath, 'utf8');
    if (!content.includes('@Patch(')) {
      // Add Patch to imports
      if (content.includes('@nestjs/common') && !content.includes('Patch')) {
        content = content.replace('Get, Post,', 'Get, Post, Patch,');
        content = content.replace('Get,Post,', 'Get, Post, Patch,');
      }

      const patchEndpoint = `\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() body: any) {\n    return this.${res.name}Service.update(id, body);\n  }\n`;
      content = content.replace('@Delete', patchEndpoint + '  @Delete');
      fs.writeFileSync(controllerPath, content);
      console.log(`Updated ${res.name}.controller.ts`);
    }
  }
}
