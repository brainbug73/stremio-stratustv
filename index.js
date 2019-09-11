const { config, proxy } = require('internal')
const hls = require('./hls')

const defaults = {
	name: 'Stratus Television',
	prefix: 'stratustv_',
	icon: 'https://4.bp.blogspot.com/-oQNkqrqPQ98/W1jECk8g7YI/AAAAAAAADjU/FxPmjwup0QI6_2ni2icom0WpHSpx2gt2gCLcBGAs/s1600/Stratus_TV_Playlist.png',
	paginate: 100
}

hls.init({ prefix: defaults.prefix, type: 'tv', config })

const defaultTypes = [
	{
		name: 'USA + Canada',
		logo: 'https://2.bp.blogspot.com/-dmh522gruT8/W1KZ86AruQI/AAAAAAAADhY/zGYXq1VXPBkqMiL6lpGTG8bzIoSXMeTIQCLcBGAs/s320/gettyimages-688899881-1519413300.jpg',
		m3u: 'https://pastebin.com/raw/4cQ9mj8X'
	},
	{
		name: 'UK + Ireland',
		logo: 'https://1.bp.blogspot.com/-vuaA4cbRXKY/W1KUx2FW-nI/AAAAAAAADhM/afNbmFsO1IsKU2pZilVeFMBV_t_1KPYaQCLcBGAs/s320/x5cgi0ode66q6vuxezqmehmexwer6bt-xlarge.jpg',
		m3u: 'https://pastebin.com/raw/J1p1Uknd'
	},
	{
		name: 'Spain',
		logo: 'https://4.bp.blogspot.com/-u9AigM7a3Cs/W1oWgzaHX8I/AAAAAAAADkQ/FJI1C_ZMjcQ3K_w42VApVIn676VeBxVZwCLcBGAs/s320/gn-gift_guide_variable_c.jpg',
		m3u: 'https://pastebin.com/raw/aji3b4dP'
	},
	{
		name: 'Latino',
		logo: 'https://2.bp.blogspot.com/-iiOc1WD98yE/W1KQdE3zgeI/AAAAAAAADhA/oFnUJ9e1i5odIHk4PHvm3rsE_M_mnYTYQCLcBGAs/s320/https---blueprint-api-production.s3.amazonaws.com-uploads-card-image-676334-5b14efe9-effc-4f52-a25f-dff4f6f55d8a.jpg',
		m3u: 'https://pastebin.com/raw/GME4W6j4'
	},
	{
		name: 'Mexico',
		logo: 'https://2.bp.blogspot.com/-bAU8H_no7hU/W1KP1hbz6zI/AAAAAAAADg4/oNlTqLsG3v0q5rH38izgNbj_hqu7tG_aQCLcBGAs/s320/7e1943d9-11a2-4211-abfc-242eaa036760.hw1.jpg',
		m3u: 'https://pastebin.com/raw/7QW9f4sz'
	},
	{
		name: 'Argentina',
		logo: 'https://1.bp.blogspot.com/-do7ceSJNs7A/W2jKWDKxZjI/AAAAAAAADns/TsICCezJdVwVpnNd75JBwn_qJty7oa_BgCLcBGAs/s320/4A0BC10000000578-5484797-image-a-3_1520676572273.jpg',
		m3u: 'https://pastebin.com/raw/urbdB0Nq'
	},
	{
		name: 'Chile',
		logo: 'https://4.bp.blogspot.com/-5v4vBc3kl4o/W2jK-fwRi_I/AAAAAAAADn0/qq7Ip6NLNeAgsAE_ashoFCqFICWh7VVzQCLcBGAs/s320/29HOURS1-jumbo.jpg',
		m3u: 'https://pastebin.com/raw/srUrYaE3'
	},
	{
		name: 'Colombia',
		logo: 'https://1.bp.blogspot.com/-iLHCzYA6Gx8/W2jLcOjjqeI/AAAAAAAADn8/fB8-VQLwTAoUHOMA_Q9I-zdPKYoYAF-LwCLcBGAs/s320/Colombia-Bogota.jpg',
		m3u: 'https://pastebin.com/raw/T7zsmaQQ'
	},
	{
		name: 'Brazil + Portugal',
		logo: 'https://4.bp.blogspot.com/-qu5soEjZxq0/W2jL8hchJvI/AAAAAAAADoI/g2px1igiDxoO8pQxVE1qrKAuKt2Xm9LhwCLcBGAs/s320/rio-de-janeiro-brazil.jpg',
		m3u: 'https://pastebin.com/raw/A89MfK78'
	},
	{
		name: 'Arab World',
		logo: 'https://2.bp.blogspot.com/-l6Lh02j_4u4/W1k-fuH0YTI/AAAAAAAADjk/k3szBKuzg488_o0H9hxBlrU-vnp9AQUAgCLcBGAs/s320/b7abf1ff9ee60fb95a6b25ceafbcd236.jpg',
		m3u: 'https://pastebin.com/raw/t1HrSBbf'
	},
	{
		name: 'India + Pakistan',
		logo: 'https://2.bp.blogspot.com/-QfI3525LinA/W1n4psWe9WI/AAAAAAAADj8/qcIz5fTw8dgHUu-mYuzjmxmdkwvA_gQFACLcBGAs/s320/6.jpg',
		m3u: 'https://pastebin.com/raw/xaqMHNqm'
	},
]

const types = []

for (let i = 0; defaultTypes[i]; i++)
	if (config['show_'+i])
		types.push(defaultTypes[i])

const catalogs = []

if (config.style == 'Catalogs')
	for (let i = 0; types[i]; i++)
		if (types[i].m3u)
			catalogs.push({
				name: types[i].name,
				id: defaults.prefix + 'cat_' + i,
				type: 'tv',
				extra: [ { name: 'search' }, { name: 'skip' } ]
			})

function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
}

function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
}

const { addonBuilder, getInterface, getRouter } = require('stremio-addon-sdk')

if (!catalogs.length)
	catalogs.push({
		id: defaults.prefix + 'cat',
		name: defaults.name,
		type: 'tv',
		extra: [{ name: 'search' }]
	})

const metaTypes = ['tv']

if (config.style == 'Channels')
	metaTypes.push('channel')

const builder = new addonBuilder({
	id: 'org.' + defaults.name.toLowerCase().replace(/[^a-z]+/g,''),
	version: '1.0.0',
	name: defaults.name,
	description: 'Thousands of free IPTV channels from Stratus TV. Includes: USA, Canada, UK, Ireland, Spain, Latino, Mexico, Argentina, Chile, Colombia, Brazil, Portugal, Arab, India and Pakistan channels.',
	resources: ['stream', 'meta', 'catalog'],
	types: metaTypes,
	idPrefixes: [defaults.prefix],
	icon: defaults.icon,
	catalogs
})

builder.defineCatalogHandler(args => {
	return new Promise((resolve, reject) => {
		const extra = args.extra || {}

		if (config.style == 'Channels') {

			const metas = []

			for (let i = 0; types[i]; i++)
				if (types[i].m3u)
					metas.push({
						name: types[i].name,
						id: defaults.prefix + i,
						type: 'channel',
						poster: types[i].logo,
						posterShape: 'landscape',
						background: types[i].logo,
						logo: types[i].logo
					})

			if (metas.length) {
				if (extra.search) {
					let results = []
					metas.forEach(meta => {
						if (meta.name && meta.name.toLowerCase().includes(extra.search.toLowerCase()))
							results.push(meta)
					})
					if (results.length)
						resolve({ metas: results })
					else
						reject(defaults.name + ' - No search results for: ' + extra.search)
				} else
					resolve({ metas })
			} else
				reject(defaults.name + ' - No M3U URLs set')

		} else if (config.style == 'Catalogs') {

			const skip = parseInt(extra.skip || 0)
			const id = args.id.replace(defaults.prefix + 'cat_', '')

			hls.getM3U((types[id] || {}).m3u, id).then(metas => {
				if (!metas.length)
					reject(defaults.name + ' - Could not get items from M3U playlist: ' + args.id)
				else {
					if (!extra.search)
						resolve({ metas: metas.slice(skip, skip + defaults.paginate) })
					else {
						let results = []
						metas.forEach(meta => {
							if (meta.name && meta.name.toLowerCase().includes(extra.search.toLowerCase()))
								results.push(meta)
						})
						if (results.length)
							resolve({ metas: results })
						else
							reject(defaults.name + ' - No search results for: ' + extra.search)
					}
				}
			}).catch(err => {
				reject(err)
			})
		}
	})
})

builder.defineMetaHandler(args => {
	return new Promise((resolve, reject) => {
		if (config.style == 'Channels') {
			const i = args.id.replace(defaults.prefix, '')
			const meta = {
				name: types[i].name,
				id: defaults.prefix + i,
				type: 'channel',
				poster: types[i].logo,
				posterShape: 'landscape',
				background: types[i].logo,
				logo: types[i].logo
			}
			hls.getM3U(types[i].m3u).then(videos => {
				meta.videos = videos
				resolve({ meta })
			}).catch(err => {
				reject(err)
			})
		} else if (config.style == 'Catalogs') {
			const i = args.id.replace(defaults.prefix + 'url_', '').split('_')[0]
			hls.getM3U(types[i].m3u, i).then(metas => {
				let meta
				metas.some(el => {
					if (el.id == args.id) {
						meta = el
						return true
					}
				})
				if (meta)
					resolve({ meta })
				else
					reject(defaults.name + ' - Could not get meta item for: ' + args.id)
			}).catch(err => {
				reject(err)
			})
		}
	})
})

builder.defineStreamHandler(args => {
	return new Promise(async (resolve, reject) => {
		if (config.style == 'Channels') {
			const url = decodeURIComponent(args.id.replace(defaults.prefix + 'url_', ''))
			const streams = await hls.processStream(proxy.addProxy(url))
			resolve({ streams: streams || [] })
		} else if (config.style == 'Catalogs') {
			const url = atob(decodeURIComponent(args.id.replace(defaults.prefix + 'url_', '').split('_')[1]))
			const streams = await hls.processStream(proxy.addProxy(url))
			resolve({ streams: streams || [] })
		}
	})
})

const addonInterface = getInterface(builder)

module.exports = getRouter(addonInterface)
