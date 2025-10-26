const sharp = require('sharp');

async function createOGImage() {
  const width = 1200;
  const height = 630;

  try {
    // Carregar e redimensionar a praia para exatamente 1200x400
    const beach = await sharp('public/beach-with-clouds.png')
      .resize(width, 400, {
        fit: 'cover',
        position: 'bottom'
      })
      .toBuffer();

    // Carregar e redimensionar o logo
    const logo = await sharp('public/babyonboard.png')
      .resize(800, null, {
        fit: 'inside'
      })
      .toBuffer();

    // Obter dimensões do logo redimensionado
    const logoMeta = await sharp(logo).metadata();
    const logoX = Math.floor((width - logoMeta.width) / 2);
    const logoY = Math.floor((height - logoMeta.height) / 2) - 50;

    // Criar overlay branco semi-transparente
    const overlayWidth = width - 100;
    const overlayHeight = 280;
    const overlay = await sharp({
      create: {
        width: overlayWidth,
        height: overlayHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0.85 }
      }
    })
    .png()
    .toBuffer();

    // Criar canvas base
    await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 232, g: 245, b: 249, alpha: 1 }
      }
    })
    .composite([
      {
        input: beach,
        top: height - 400,
        left: 0
      },
      {
        input: overlay,
        top: Math.floor((height - overlayHeight) / 2) - 50,
        left: 50
      },
      {
        input: logo,
        top: logoY,
        left: logoX
      }
    ])
    .png({ quality: 95 })
    .toFile('public/og-image.png');

    console.log('✅ Imagem criada: public/og-image.png (1200x630px)');
  } catch (error) {
    console.error('❌ Erro ao criar imagem:', error.message);
  }
}

createOGImage();
