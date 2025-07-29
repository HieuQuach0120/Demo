import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputTextCustom from "../common/InputTextCustom";
import { Card } from "primereact/card";

interface DataSearch {
  city: string;
  offset: number;
  limit: number;
}

const WeatherComponent: React.FC = () => {
  const [dataSearch, setDataSearch] = useState<DataSearch>({
    city: "Hanoi",
    offset: 0,
    limit: 1,
  });

  const [weatherList, setWeatherList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: { city: "" },
  });

  useEffect(() => {
    fetchWeather();
  }, [dataSearch.offset]);

  const fetchWeather = async () => {
    if (!dataSearch.city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${dataSearch.city}&units=metric&appid=ee7bb6a86af3994eed54d1ec25246432`
      );
      if (!response.ok) {
        throw new Error("Không tìm thấy thành phố");
      }
      const data = await response.json();
      setWeatherList([data]);
    } catch (err: any) {
      setError(err.message);
      setWeatherList([]);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (formData: any) => {
    const updated = { ...dataSearch, city: formData.city, offset: 0 };
    setDataSearch(updated);
    setTimeout(fetchWeather, 0);
  };

  const handlePageChange = (event: any) => {
    const updated = { ...dataSearch, offset: event.first };
    setDataSearch(updated);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="d-flex justify-content-center mb-4">
          <div className="d-flex gap-2" style={{ width: "100%", maxWidth: "600px" }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <InputTextCustom
                  label=""
                  placeholder="Nhập tên thành phố..."
                  required={false}
                  maxLength={100}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  isValidate={false}
                />
              )}
            />
            <Button type="submit" label="Tìm kiếm" className="flex-shrink-0" />
          </div>
        </div>
      </form>


      {error && <div className="text-danger mb-3">{error}</div>}

      <div className="d-flex justify-content-center">
        <Card
          title={`Thời tiết tại ${weatherList[0]?.name ?? "..."}`}
          className="p-3 border bg-light"
          role="region"
          style={{ width: "350px" }}
        >
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : weatherList.length > 0 ? (
            <div>
              <p>🌡️ Nhiệt độ: {weatherList[0].main.temp} °C</p>
              <p>💧 Độ ẩm: {weatherList[0].main.humidity} %</p>
              <p>🌤️ Mô tả: {weatherList[0].weather?.[0]?.description ?? "Không có"} </p>
            </div>
          ) : (
            <p>Không có dữ liệu thời tiết.</p>
          )}
        </Card>
      </div>
    </>
  );
};

export default WeatherComponent;
