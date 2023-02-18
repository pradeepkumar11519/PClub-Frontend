import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { ContextProvider } from '@/context/Context'
import '@/styles/globals.css'
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
import LoadingBar from 'react-top-loading-bar'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { CloseOffCanvasNavbar } from '@/components/OffCanvasNavbar'
export default function App({ Component, pageProps }) {
	
	const queryClient = React.useRef(new QueryClient())
	const router = useRouter()
	const [Progress, setProgress] = React.useState(0)

	React.useEffect(() => {

		router.events.on('routeChangeStart', () => {
			setProgress(40)
			CloseOffCanvasNavbar()

		})
		router.events.on('routeChangeComplete', () => {
			setProgress(100)
			

		})

	}, [])
	return (
		<>

			<QueryClientProvider client={queryClient.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<ContextProvider>
						<div className={`bg-[#1f2029] w-full h-full `}>
							<Navbar  />
							<LoadingBar
              color='#E11D48'
              progress={Progress}
              height={5}
              shadowStyle={{'height':'5px','width':'20px'}}
              waitingTime={200}
              onLoaderFinished={() => setProgress(0)}
            />
							<ToastContainer />
							<Component  {...pageProps} />
						</div>
					</ContextProvider>
				</Hydrate>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider >
		</>


	)
}
