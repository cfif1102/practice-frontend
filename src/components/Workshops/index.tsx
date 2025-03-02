import {
  IconBtn,
  ItemHeader,
  LoadBtn,
  NavDiv,
  PageNumber,
  PaginationDiv,
  TableLoadingDiv,
  TBody,
  THead,
} from '@components/Equipments/styled';
import { COLORS } from '@constants';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Table } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { deleteWorkshops, getWorkshops } from '@thunks';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

export const Workshops: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workshops, nextPage, prevPage, getWorkshopsThunk, page, size } = useSelector(
    (state: RootState) => state.workshops,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getWorkshops({ page, pageSize: size }));
  }, []);

  const isLoading = getWorkshopsThunk.status === 'pending';

  const handleLoadNext = () => {
    if (!nextPage) {
      return;
    }

    dispatch(getWorkshops({ page: nextPage, pageSize: size }));
  };

  const handleLoadPrev = () => {
    if (!prevPage) {
      return;
    }

    dispatch(getWorkshops({ page: prevPage, pageSize: size }));
  };

  const handleDelete = (id: number) => () => {
    const confirmed = window.confirm('Вы действительно хотите удалить запись?');

    if (!confirmed) {
      return;
    }

    dispatch(deleteWorkshops(id));
  };

  if (isLoading) {
    return (
      <div>
        <PaginationDiv>
          <ItemHeader>Цех</ItemHeader>

          <NavDiv>
            <Skeleton width="200px" height="30px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
          </NavDiv>
        </PaginationDiv>

        <TableLoadingDiv>
          <Skeleton width="100%" height="70vh" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
        </TableLoadingDiv>
      </div>
    );
  }

  return (
    <>
      <PaginationDiv>
        <ItemHeader>Цех</ItemHeader>

        <NavDiv>
          {prevPage && <LoadBtn onClick={handleLoadPrev}>Пред.</LoadBtn>}
          <PageNumber>Страница: {page}</PageNumber>
          {nextPage && <LoadBtn onClick={handleLoadNext}>След.</LoadBtn>}
        </NavDiv>
      </PaginationDiv>
      <Table border={1}>
        <THead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Операция</th>
          </tr>
        </THead>
        <TBody>
          {workshops.map((wk) => (
            <tr key={wk.id}>
              <td>{wk.id}</td>
              <td>{wk.name}</td>
              <td>
                {user && user.role === Roles.Admin && (
                  <>
                    <Link to={`/workshops/${wk.id}/edit`}>
                      <IconBtn icon={faPencil} />
                    </Link>
                    <IconBtn icon={faTrash} onClick={handleDelete(wk.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};
