'use strict'
{
  const marginColorInputLabel = $('#margin-color-input-label')
  const marginColorInput = (
    $('#margin-color-input')
      .on('input', ({ target: { value } }) => {
        marginColorInputLabel.text(`余白の色：${value}`)
      })
  )

  const marginAlphaInputLabel = $('#margin-alpha-input-label')
  const marginAlphaInput = (
    $('#margin-alpha-input')
      .on('input', ({ target: { value } }) => {
        marginAlphaInputLabel.text(`余白の透明度：${value}`)
      })
  )

  const squareCheckbox = $('#square-checkbox')

  const disable = () => {
    $('label').addClass('disabled')
    $('input, button').prop('disabled', true)
  }
  const enable = () => {
    $('label').removeClass('disabled')
    $('input, button').prop('disabled', false)
  }

  const fileInput = $('#file-input')
  const getFile = () => (
    fileInput.prop('files')?.[0]
  )

  $('#crop-button')
    .on('click', async () => {
      disable()

      const file = getFile()

      if (!file) {
        alert('ファイルを選択してください')
        enable()

        return
      }

      const src = URL.createObjectURL(file)
      const rgb = lib.hexToRgb(marginColorInput.val())
      const alpha = Number(marginAlphaInput.val())
      const afterSrc = await lib.getMinimumImage(src, {
        color: new lib.Color(...rgb, alpha)
      })

      URL.revokeObjectURL(src)

      const cv = $('#canvas')
      const ctx = cv.get(0).getContext('2d')

      if (!ctx) {
        enable()

        return
      }

      const afterImg = await lib.loadImage(afterSrc)

      if (squareCheckbox.prop('checked')) {
        const size = Math.max(afterImg.naturalWidth, afterImg.naturalHeight)

        cv.attr({
          width: size,
          height: size
        })
        ctx.drawImage(
          afterImg,
          (size - afterImg.naturalWidth) / 2,
          (size - afterImg.naturalHeight) / 2
        )
      } else {
        cv.attr({
          width: afterImg.naturalWidth,
          height: afterImg.naturalHeight
        })
        ctx.drawImage(afterImg, 0, 0)
      }

      enable()
    })
}