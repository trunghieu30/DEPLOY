import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import cn from 'classnames'
import { useQueryUrl } from '../../components/Hooks/useQueryUrl'
import { getMovieList } from '../../reducers/quanLyPhim/quanLyPhimReducer'
import { useQuanLyPhim } from '../../reducers/quanLyPhim/quanLyPhimSelector'
import MultipleRowSlick from './MultipleRowSlick'

const HomeCard = () => {

    const dispatch = useDispatch()

    const [query, setQueryUrl] = useQueryUrl({
        isShowing: true
    })

    const { movieList } = useQuanLyPhim()

    useEffect(() => {

        dispatch(getMovieList())
    }, [])
    return (
        <div className='container'>
            <div className='mt-10 mb-5 text-white ml-24'>
                <Button type="button" className={cn({ active: query.isShowing === 'true' })} onClick={() => {
                    setQueryUrl({
                        isShowing: true,
                    })
                }}>
                    Đang Chiếu
                </Button>
                <Button type="button" className={cn('ml-4', { active: query.isShowing === 'false' })} onClick={() => {
                    setQueryUrl({
                        isShowing: false,
                    })
                }}>
                    Sắp Chiếu
                </Button>
            </div>

            <MultipleRowSlick movieList={movieList} query={query.isShowing} />

        </div>
    )
}

export default HomeCard

const Button = styled.button`
  flex: 1 1 auto;
  margin: 10px;
  padding: 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
  &:hover{
background-position: right center;
  }
 
  &.active{
    background-color:#ffc1e3;
   color: black;
  }

`