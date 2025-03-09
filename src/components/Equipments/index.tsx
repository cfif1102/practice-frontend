import { LinkStyled } from '@components/Header/styled';
import { COLORS } from '@constants';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Table } from '@mui/material';
import { equipmentsActions } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { deleteEquipments, getEquipments } from '@thunks';
import { FC, useEffect, useState } from 'react';
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
  const [orders, setOrders] = useState({
    id: 'asc',
    name: 'asc',
    manufacturer: 'asc',
    type: 'asc',
    model: 'asc',
    innovationNumber: 'asc',
    serialNumber: 'asc',
    workHours: 'asc',
    workshop: 'asc',
  });

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

  const handleIdSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) => (orders.id === 'asc' ? b.id - a.id : a.id - b.id)),
      ),
    );

    setOrders({ ...orders, id: orders.id === 'asc' ? 'desc' : 'asc' });
  };

  const handleNameSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.name === 'asc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
        ),
      ),
    );

    setOrders({ ...orders, name: orders.name === 'asc' ? 'desc' : 'asc' });
  };

  const handleManufacturerSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.manufacturer === 'asc'
            ? b.manufacturer.localeCompare(a.manufacturer)
            : a.manufacturer.localeCompare(b.manufacturer),
        ),
      ),
    );

    setOrders({ ...orders, manufacturer: orders.manufacturer === 'asc' ? 'desc' : 'asc' });
  };

  const handleTypeSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.type === 'asc' ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type),
        ),
      ),
    );

    setOrders({ ...orders, type: orders.type === 'asc' ? 'desc' : 'asc' });
  };

  const handleModelSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.model === 'asc' ? b.model.localeCompare(a.model) : a.model.localeCompare(b.model),
        ),
      ),
    );

    setOrders({ ...orders, model: orders.model === 'asc' ? 'desc' : 'asc' });
  };

  const handleInnNumSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.innovationNumber === 'asc'
            ? b.innovationNumber.localeCompare(a.innovationNumber)
            : a.innovationNumber.localeCompare(b.innovationNumber),
        ),
      ),
    );

    setOrders({ ...orders, innovationNumber: orders.innovationNumber === 'asc' ? 'desc' : 'asc' });
  };

  const handleSerNumSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.serialNumber === 'asc'
            ? b.serialNumber.localeCompare(a.serialNumber)
            : a.serialNumber.localeCompare(b.serialNumber),
        ),
      ),
    );

    setOrders({ ...orders, serialNumber: orders.serialNumber === 'asc' ? 'desc' : 'asc' });
  };

  const handleWorHSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.workHours === 'asc' ? b.workHours - a.workHours : a.workHours - b.workHours,
        ),
      ),
    );

    setOrders({ ...orders, workHours: orders.workHours === 'asc' ? 'desc' : 'asc' });
  };

  const handleWorkSort = () => {
    dispatch(
      equipmentsActions.setEquipments(
        [...equipments].sort((a, b) =>
          orders.workshop === 'asc'
            ? b.workshop.name.localeCompare(a.workshop.name)
            : a.workshop.name.localeCompare(b.workshop.name),
        ),
      ),
    );

    setOrders({ ...orders, workshop: orders.workshop === 'asc' ? 'desc' : 'asc' });
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

        <LinkStyled to={'/equipments/create'}>Добавить</LinkStyled>

        <NavDiv>
          {prevPage && <LoadBtn onClick={handleLoadPrev}>Пред.</LoadBtn>}
          <PageNumber>Страница: {page}</PageNumber>
          {nextPage && <LoadBtn onClick={handleLoadNext}>След.</LoadBtn>}
        </NavDiv>
      </PaginationDiv>
      <Table border={1}>
        <THead>
          <tr>
            <th onClick={handleIdSort}>ID</th>
            <th onClick={handleNameSort}>Наз.</th>
            <th onClick={handleManufacturerSort}>Произв.</th>
            <th onClick={handleTypeSort}>Тип</th>
            <th onClick={handleModelSort}>Модель</th>
            <th onClick={handleInnNumSort}>Инв.ном.</th>
            <th onClick={handleSerNumSort}>Сер.ном.</th>
            <th onClick={handleWorHSort}>Рб.вр.</th>
            <th onClick={handleWorkSort}>Цех</th>
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
                    <Link to={`/equipments/${eq.id}/edit`}>
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
