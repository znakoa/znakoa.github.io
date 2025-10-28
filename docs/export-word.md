---
sidebar_position: 2
---

# 前端导出 Word 文件

在前端项目中，我们常常需要根据模板动态生成 Word 文件并下载，常用的方案是通过 `docxtemplater` 等库来完成。

下面是实现前端导出 Word 的完整方法。

---

## 所需依赖

安装以下库：

```bash
npm install docxtemplater pizzip jszip-utils file-saver
````

或

```bash
yarn add docxtemplater pizzip jszip-utils file-saver
```

:::note 版本信息

* `pizzip`：^3.2.0
* `jszip-utils`：^0.1.0
* `file-saver`：^2.0.5
* `docxtemplater`：^3.65.1

:::

---

## 完整代码示例

下面是一个基于 Vue 项目中使用的完整方法：

```js showLineNumbers
import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

/**
 * 导出 Word 文件
 * @param {string} url - 模板文件地址（如 public/template.docx）
 * @param {string} docxname - 下载后生成的文件名
 * @param {Object} data - 渲染模板的数据对象
 */
export function exportWord(url, docxname, data) {
  JSZipUtils.getBinaryContent(url, function (error, content) {
    if (error) {
      throw error;
    }
    // 创建一个 PizZip 实例，加载 .docx 文件内容
    let zip = new PizZip(content);

    // 创建 docxtemplater 实例，并传入 zip
    let doc = new docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    try {
      // 将数据渲染到模板中
      doc.render(data);
    } catch (error) {
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({ error: e }));
      throw error;
    }

    // 生成二进制数据 Blob
    let out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // 触发浏览器下载
    saveAs(out, docxname);
  });
}
```

---

## 使用示例

假设你有一个 Word 模板 `template.docx`，并且模板里有变量 `${name}`，你可以这样调用：

```js
exportWord('/template.docx', '测试文档.docx', { name: '张三' });
```

这样即可下载生成替换好数据的 Word 文件。

---

## 常见问题

✅ **模板路径**

* 推荐放在 `public` 文件夹里，避免打包丢失

✅ **中文乱码**

* 注意模板本身要使用兼容字体（如微软雅黑）
* 不同浏览器对下载文件名支持不同，可用 `encodeURIComponent` 处理中文名

---