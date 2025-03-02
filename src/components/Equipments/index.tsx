import { COLORS } from '@constants';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Table } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { deleteEquipments, getEquipments } from '@thunks';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

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
} from './styled';

export const Equipments: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { equipments, nextPage, prevPage, getEquipmentsThunk, page, size } = useSelector(
    (state: RootState) => state.equipments,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getEquipments({ page, pageSize: size }));
  }, []);

  const isLoading = getEquipmentsThunk.status === 'pending';

  const handleLoadNext = () => {
    if (!nextPage) {
      return;
    }

    dispatch(getEquipments({ page: nextPage, pageSize: size }));
  };

  const handleLoadPrev = () => {
    if (!prevPage) {
      return;
    }

    dispatch(getEquipments({ page: prevPage, pageSize: size }));
  };

  const handleDelete = (id: number) => () => {
    const confirmed = window.confirm('Вы действительно хотите удалить запись?');

    if (!confirmed) {
      return;
    }

    dispatch(deleteEquipments(id));
  };

  if (isLoading) {
    return (
      <div>
        <PaginationDiv>
          <ItemHeader>Оборудование</ItemHeader>

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
        <ItemHeader>Оборудование</ItemHeader>

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
            <th>Наз.</th>
            <th>Произв.</th>
            <th>Тип</th>
            <th>Модель</th>
            <th>Инв.ном.</th>
            <th>Сер.ном.</th>
            <th>Рб.вр.</th>
            <th>Цех</th>
            <th>Операция</th>
          </tr>
        </THead>
        <TBody>
          {equipments.map((eq) => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.name}</td>
              <td>{eq.manufacturer}</td>
              <td>{eq.type}</td>
              <td>{eq.model}</td>
              <td>{eq.innovationNumber}</td>
              <td>{eq.serialNumber}</td>
              <td>{eq.workHours} ч.</td>
              <td>{eq.workshop.name}</td>
              <td>
                {user && user.role === Roles.Admin && (
                  <>
                    <Link to={`/equipmens/${eq.id}/edit`}>
                      <IconBtn icon={faPencil} />
                    </Link>
                    <IconBtn icon={faTrash} onClick={handleDelete(eq.id)} />
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
