function insert ($vm, prefix, hint = '', subfix = '') {
  const value = $vm.value
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    let start = $vm.selectionStart
    let end = $vm.selectionEnd

    const restoreTop = $vm.scrollTop

    if (start === end) {
      $vm.value =
        value.substring(0, start) +
        prefix +
        hint +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length + hint.length
    } else {
      $vm.value =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length
    }

    $vm.focus()
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
  }
}

const toolbar = {
  h1 ($vm) {
    insert($vm, arguments[2] + '# ', '一级标题')
  },
  h2 ($vm) {
    insert($vm, arguments[2] + '## ', '二级标题')
  },
  h3 ($vm) {
    insert($vm, arguments[2] + '### ', '三级标题')
  },
  h4 ($vm) {
    insert($vm, arguments[2] + '#### ', '四级标题')
  },
  image ($vm, url) {
    insert($vm, `![alt](${url}?x-oss-process=image/resize,l_400)`)
  },
  link ($vm) {
    insert($vm, '[title](', 'url', ')')
  },
  code ($vm) {
    insert($vm, arguments[2] + '```', 'language', '\n\n```')
  },
  tab ($vm) {
    insert($vm, '  ')
  },
  table ($vm) {
    insert($vm, arguments[2] + '| 标题 | 描述 |\n| - | - |\n| 编辑器 | Markdown |\n')
  },
  list ($vm) {
    insert($vm, `${arguments[2]}- item1\n - subitem1\n- item2`)
  },
  block ($vm) {
    insert($vm, `${arguments[2]}>`)
  }
}

export default ($vm, type, url, value) => {
  return toolbar[type]($vm, url, value)
}