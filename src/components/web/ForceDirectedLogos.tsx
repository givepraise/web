import React, { MouseEvent, useEffect, useRef } from 'react'
import { forceCenter, forceManyBody, forceSimulation } from 'd3-force'

const ForceDirectedLogos = ({ width = 600, height = 470, distance = 30 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const logoUrls = [
      '/img/logos/bankless.png',
      '/img/logos/brightid.png',
      '/img/logos/deepwork.png',
      '/img/logos/giveth.png',
      '/img/logos/gnosis.png',
      '/img/logos/protein.png',
      '/img/logos/tec.png',
      '/img/logos/cs.png',
      '/img/logos/gm.png',
      '/img/logos/dappnode.png',
      '/img/logos/refidao.png',
      '/img/logos/shapeshift.png',
      '/img/logos/talentdao.png',
    ]

    const logoLinks = [
      'https://bankless.givepraise.xyz',
      'https://brightid.givepraise.xyz',
      'https://praise.deepwork.studios',
      'https://praise.giveth.io',
      'https://praisegnosisdao.com',
      'https://protein.givepraise.xyz',
      'https://praise.tecommons.org',
      'https://praise.commonsstack.org',
      'https://https://praise.generalmagic.io/',
      'https://dappnode.givepraise.xyz',
      'https://refidao.givepraise.xyz',
      'https://shapeshift.givepraise.xyz',
      'https://talentdao.givepraise.xyz',
    ]

    const nodes = logoUrls.map((url, index) => ({
      index,
      url,
      link: logoLinks[index],
      radius: 80,
      x: 0,
      y: 0,
    }))

    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-distance))
      .force('center', forceCenter(width / 2, height / 2))
      .on('tick', ticked)

    function ticked() {
      if (!context) return

      context.clearRect(0, 0, width, height)

      nodes.forEach((node) => {
        const img = new Image()
        img.src = node.url
        context.drawImage(
          img,
          node.x - node.radius / 2,
          node.y - node.radius / 2,
          node.radius,
          node.radius
        )
      })
    }

    function handleClick(event: any) {
      const { offsetX, offsetY } = event
      const node = nodes.find(
        (d) => Math.hypot(offsetX - d.x, offsetY - d.y) <= d.radius / 2
      )
      if (node) {
        window.open(node.link, '_blank')
      }
    }

    if (!canvas) return

    canvas.removeEventListener('click', handleClick)

    return () => {
      simulation.stop()
      canvas.removeEventListener('click', handleClick)
    }
  }, [width, height, distance])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default ForceDirectedLogos
