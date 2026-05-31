/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import L from "leaflet";
import { Chart } from "react-google-charts";

const ReportCard = () => {
  const auth = useSelector((state) => state.auth);
  const [reports, setReports] = useState([]);
  const defaultCoord = {
    latitude: "1.7575368113083125",
    longitude: "115.65804619654459",
    zoom: "1",
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${import.meta.env.VITE_HOST_SERENITY}/admin/report/coordinates?limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ""}`,
          },
        }
      );
      setReports(result.data.data);
    };
    fetchData();
  }, []);

  const statusCount = reports.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {});

  const totalCount = reports.length;

  const MapMarker = (status) => {
    const markerColors = {
      Menunggu: "red",
      Diproses: "yellow",
      Selesai: "green",
    };

    // eslint-disable-next-line no-undef
    var newIcon = new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColors[status]}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    return newIcon;
  };

  const chartData = [
    ["Status", "Count"],
    ["Menunggu", statusCount.Menunggu],
    ["Diproses", statusCount.Diproses],
    ["Selesai", statusCount.Selesai],
  ];

  const chartOptions = {
    pieHole: 0.4,
    slices: [
      {
        color: "red",
      },
      {
        color: "gold",
      },
      {
        color: "limegreen",
      },
    ],
    chartArea: { width: "100%" },
    hAxis: {
      minValue: 0,
    },
    vAxis: {
      title: "Count",
    },
    legend: "none",
  };

  return (
    <div className="m-2 my-8 md:px-4">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12">
        <div className="">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl capitalize">
            Dashboard
          </h2>
          <br></br>
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-black-500">
              Total Laporan : {totalCount}
            </h2>
          </div>
          <Chart
            chartType="PieChart"
            data={chartData}
            options={chartOptions}
            width={"100%"}
            height={"500px"}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
            {Object.entries(statusCount)
              .sort((a, b) => {
                const statusOrder = {
                  Menunggu: 0,
                  Diproses: 1,
                  Selesai: 2,
                };
                return statusOrder[a[0]] - statusOrder[b[0]];
              })
              .map(([status, count]) => (
                <div
                  key={status}
                  className={`group overflow-hidden shadow sm:rounded-lg transition-all duration-100 ease-in
                  ${
                    status === "Menunggu"
                      ? "bg-red-500"
                      : status === "Diproses"
                        ? "bg-yellow-500"
                        : status === "Selesai"
                          ? "bg-green-500"
                          : "bg-white hover:bg-green-600"
                  }
                `}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm leading-5 font-medium text-white truncate">
                        {status}
                      </dt>
                      <dd className="mt-1 text-3xl leading-9 font-semibold text-white truncate">
                        {count}
                      </dd>
                    </dl>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <br></br>
        <h4 className="text-3xl font-extrabold tracking-tight text-gray-900  capitalize">
          Lokasi Laporan
        </h4>
        <div className="col-span-1 my-4">
          <MapContainer
            center={[defaultCoord.latitude, defaultCoord.longitude]}
            zoom={5}
            scrollWheelZoom={true}
            className="h-64 w-full mt-4"
          >
            <TileLayer
              attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.map((report) => (
              <div key={report._id}>
                <Marker
                  key={report._id}
                  position={[report.latitude, report.longitude]}
                  status={report.status}
                  icon={MapMarker(report.status)}
                  className="bg-red-200"
                >
                  <Popup>
                    <div>{report.status}</div>
                    <Link to={`report/detail/${report._id}`}>Detail</Link>
                  </Popup>
                </Marker>
              </div>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
